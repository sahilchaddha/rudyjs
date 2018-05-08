//
//  logger.ts
//  Tribe-cms
//
//  Created by Sahil Chaddha on 07/05/2018.
//  Copyright © 2018 Tribe-CMS.tv. All rights reserved.
//

import chalk from "chalk"
/* tslint:disable no-console */

const error = chalk.red
const debug = chalk.yellow
const verbose = chalk.blue
const info = chalk.green

interface ILoggerParams {
    message?: string
    category?: string
    data?: any
}

export enum LogLevel {
    INFO = "INFO",
    VERBOSE = "VERBOSE",
    DEBUG = "DEBUG",
    ERROR = "ERROR",
}

class Logger {
    private logLevel: LogLevel

    constructor() {
        this.logLevel = LogLevel.INFO
    }

    public setLogLevel(level: LogLevel) {
        this.logLevel = level
    }

    public error(params: ILoggerParams) {
        this.logMessage(error(this.getLogMessage(params, LogLevel.ERROR)), params)
    }
    public verbose(params: ILoggerParams) {
        if (this.logLevel === LogLevel.VERBOSE || this.logLevel === LogLevel.DEBUG) {
            this.logMessage(verbose(this.getLogMessage(params, LogLevel.VERBOSE)), params)
        }
    }
    public debug(params: ILoggerParams) {
        if (this.logLevel === LogLevel.DEBUG) {
            this.logMessage(debug(this.getLogMessage(params, LogLevel.DEBUG)), params)
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
