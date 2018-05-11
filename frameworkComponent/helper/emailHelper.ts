import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { FrameworkComponent } from "./frameworkHelper";
var q = require('q');

export class EmailHelper {

    sendEmailTrail() {
        var transporter: nodemailer.Transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'prabu.r13@gmail.com',
                pass: 'Prabur@123'
            },
            tls: { rejectUnauthorized: false },
            debug: true
        });

        var mailOptions = {
            to: 'prabu.nkl@gmail.com',
            subject: 'Test Summary Report',
            text: ""

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Mail sent: ' + info.response);
        });
    };

    sendEmailWithContent(transporter: nodemailer.Transporter, mailOptions: MailOptions) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                FrameworkComponent.logHelper.error(error);
                return console.log(error);
            } else {
                FrameworkComponent.logHelper.info("Mail sent : " + info.response);
            }
        });
    }

    sendEmail(mailConfig, subjectInfo, mailBodyInfo, attachmentFilePath?, attachmentFileName?) {
        try {
            //Create Transporter to send an email
            var transporter: nodemailer.Transporter = nodemailer.createTransport({
                service: mailConfig.service,
                host: mailConfig.host,
                port: mailConfig.port,
                auth: {
                    user: mailConfig.username,
                    pass: mailConfig.password
                },
                tls: { rejectUnauthorized: false },
                debug: true
            });

            //Create mail options to send an email
            var mailOptions = {
                from: mailConfig.fromMail,
                to: mailConfig.mailList,
                subject: subjectInfo,
                html: mailBodyInfo,
                attachments: [
                    {
                        filename: attachmentFileName,
                        path: attachmentFilePath + '/' + attachmentFileName,
                    }
                ]
            };

            this.sendEmailWithContent(transporter, mailOptions);
        } catch (error) {
            FrameworkComponent.logHelper.error(error);
            throw error;
        }

    }
}