import { FrameworkComponent } from "./frameworkHelper";
var path = require("path");
const client = require("mssql");

export class DatabaseHelper {


    createConnectionString(serverName, databaseName, userName, passwrd, portNumber?, requestTimeout?, connectionTimeout?) {
        try {
            return {
                server: serverName,
                database: databaseName,
                user: userName,
                password: passwrd,
                port: portNumber,
                requestTimeout: requestTimeout,
                connectionTimeout: connectionTimeout
            };
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async connectToDatabase(dbConfig) {
        try {
            var __dbConnection = new client.ConnectionPool(dbConfig);
            await __dbConnection.connect();

            if (await this.isDatabaseConnected(__dbConnection)) {
                return __dbConnection;
            } else {
                throw "Unable to connect to database with the given parameters";
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async executeQueryWithConfigDetails(dbConfig, queryString) {
        try {
            return await this.connectToDatabase(dbConfig).then((dbConnection) => {
                return this.createRequest(dbConnection).then((request) => {
                    return this.queryRequest(request, queryString).then((result) => {
                        this.closeDatabaseConnection(dbConnection);
                        return result.recordset.toTable();
                    });
                });
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async executeQuery(serverName, databaseName, userName, password, queryString, portNumber?, requestTimeout?, connectionTimeout?) {
        try {
            let __dbConfig = this.createConnectionString(serverName, databaseName, userName, password, portNumber, requestTimeout, connectionTimeout);
            return this.executeQueryWithConfigDetails(__dbConfig, queryString);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async executeStoredProcedureWithoutParameters(dbConfig, storedProcedureName) {
        try {
            return await this.connectToDatabase(dbConfig).then((dbConnection) => {
                return this.createRequest(dbConnection).then((request) => {
                    return this.executeRequest(request, storedProcedureName).then((result) => {
                        this.closeDatabaseConnection(dbConnection);
                        return result.recordset.toTable();
                    });
                })
            }).catch((error) => {
                throw error;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async executeStoredProcedureWithInputParameters(dbConfig, storedProcedureName, inputParameters: any[], parameterValues: any[]) {
        try {

            return await this.connectToDatabase(dbConfig).then((dbConnection) => {
                return this.createRequest(dbConnection).then((request) => {
                    return this.addStoredProcedureParametersToRequest(request, inputParameters, parameterValues).then((req) => {
                        return this.executeRequest(req, storedProcedureName).then((result) => {
                            this.closeDatabaseConnection(dbConnection);
                            return result.recordset.toTable();
                        });
                    });
                });
            }).catch((error) => {
                throw error;
            });
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    closeDatabaseConnection(dbConnection) {
        try {
            dbConnection.close();
            if (!dbConnection.connected) {
                FrameworkComponent.logHelper.info("Database connection has been safely closed");
            } else {
                FrameworkComponent.logHelper.info("Database connection has not been closed successfully");
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async isDatabaseConnected(dbConnection) {
        try {
            if (dbConnection.connected) {
                FrameworkComponent.logHelper.info("Database connection has been successfully established");
                return true;
            } else {
                FrameworkComponent.logHelper.info("Unable to connect to the database with the given connection string");
            }
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async createRequest(dbConnection) {
        try {
            return new client.Request(dbConnection);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async queryRequest(request, queryString) {
        try {
            return await request.query(queryString);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async executeRequest(request, storedProcedureName) {
        try {
            return await request.execute(storedProcedureName);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async addStoredProcedureParametersToRequest(request, inputParameters, parameterValues) {
        try {
            if (inputParameters.length === parameterValues.length) {
                for (let index = 0; index < inputParameters.length; index++) {
                    request.input(inputParameters[index], client.VarChar(50), parameterValues[index]);
                }
            } else {
                throw "Input Parameters count does not match Parameter Values count. ";
            }
            return request;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

}