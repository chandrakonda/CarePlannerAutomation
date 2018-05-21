import { FrameworkComponent } from "./frameworkHelper";
var path = require("path");
const client = require("mssql");

export class DatabaseHelper {

    async query(dbConfig, query) {
        try {
            const __dbConnection = new client.ConnectionPool(dbConfig);
            let __queryResult;
            await __dbConnection.connect();

            if(__dbConnection.connected) {
                
                FrameworkComponent.logHelper.info("Database connection has been established");
                __queryResult = await __dbConnection.request().query(query);
                __dbConnection.close();
            } else {
                FrameworkComponent.logHelper.info("Unable to connect to the database with the given connection string");
            }
            return __queryResult.recordsets;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    createConnectionString(serverName, databaseName, userName, passwrd, portNumber?) {
        try {
            let __config = {              
                server : serverName,
                database : databaseName,
                user : userName,
                password : passwrd,
                port : portNumber
            }
            return __config;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }

    async queryDatabase(serverName, databaseName, userName, password, queryString, portNumber) {
        try {
            let __dbConfig = this.createConnectionString(serverName, databaseName, userName, password, portNumber);
            const __dbConnection = new client.ConnectionPool(__dbConfig);
            let __queryResult;
            await __dbConnection.connect();

            if(__dbConnection.connected) {
                
                FrameworkComponent.logHelper.info("Database connection has been established");
                __queryResult = await __dbConnection.request().query(queryString);
                
                FrameworkComponent.logHelper.info(__queryResult);
                __dbConnection.close();
            } else {
                FrameworkComponent.logHelper.info("Unable to connect to the database with the given connection string");
            }
            return __queryResult.recordSets;
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }
    }
    
}