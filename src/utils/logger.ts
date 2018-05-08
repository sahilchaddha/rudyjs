//
//  logger.ts
//  RUDY
//
//  Created by Sahil Chaddha on 07/05/2018.
//  Copyright © 2018 RUDY. All rights reserved.
//

import chalk from "chalk"
/* tslint:disable no-console */

const error = chalk.red
const verbose = chalk.yellow
const info = chalk.blue

interface ILoggerParams {
    message?: string
    category?: string
    data?: any
}

export enum LogLevel {
    INFO = "INFO",
    VERBOSE = "VERBOSE",
    ERROR = "ERROR",
}

class Logger {
    public static logLevel: LogLevel = LogLevel.INFO

    public setLogLevel(level: LogLevel) {
        Logger.logLevel = level
        this.verbose({message: "Logger set to Verbose", category: "Logger"})
    }

    public error(params: ILoggerParams) {
        this.logMessage(error(this.getLogMessage(params, LogLevel.ERROR)), params)
    }
    public verbose(params: ILoggerParams) {
        if (Logger.logLevel === LogLevel.VERBOSE) {
            this.logMessage(verbose(this.getLogMessage(params, LogLevel.VERBOSE)), params)
        }
    }

    public info(params: ILoggerParams) {
        this.logMessage(info(this.getLogMessage(params, LogLevel.INFO)), params)
    }

    private logMessage(text: string, params: ILoggerParams) {
        console.log(text)

        if (params.data != null) {
            console.log(params.data)
        }
    }

    private getLogMessage(params: ILoggerParams, logType: LogLevel): string {
        return new Date() + " *** " + logType + " ::: "
        + params.category + " ::: " + params.message + " ***"
    }
}

const logger: Logger = new Logger()

export default logger
