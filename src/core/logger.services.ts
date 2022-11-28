import log4js, { Logger } from "log4js";
import { DEFAULT_LOG_FOLDER } from "../constants";
import path from "path";

interface ILoggerService {
    log(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
}

class LoggerService implements ILoggerService {

    private _logger: Logger;

    constructor() {
        log4js.configure({
            appenders: {
                console: {
                    type: "console"
                },
                file: {
                    type: "dateFile",
                    filename: path.join(DEFAULT_LOG_FOLDER, "masa-backend.log"),
                    keepFileExt: true,
                    numBackups: 7,
                    compress: true
                },
                logLevelConsole: {
                    type: "logLevelFilter",
                    level: "info",
                    appender: "console"
                },
                logLevelFile: {
                    type: "logLevelFilter",
                    level: "debug",
                    appender: "file"
                }
            },
            categories: {
                default: {
                    appenders: ["logLevelConsole", "logLevelFile"],
                    level: "all"
                }
            }
        });

        this._logger = log4js.getLogger("logs");
    }


    public log(message?: any, ...optionalParams: any[]): void {
        this._logger.log(message, ...optionalParams);
    }

    public info(message?: any, ...optionalParams: any[]): void {
        this._logger.info(message, ...optionalParams);
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        this._logger.warn(message, ...optionalParams);
    }

    public error(message?: any, ...optionalParams: any[]): void {
        this._logger.error(message, ...optionalParams);
    }

    public debug(message?: any, ...optionalParams: any[]): void {
        this._logger.debug(message, ...optionalParams);
    }

}

export default new LoggerService();