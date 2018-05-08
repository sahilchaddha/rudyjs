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

// Parse Arguments
program
.version("1.0.0", "-v, --version")
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
    // Show Help if Target is not specified
    if (program.target == null) {
        program.help()
        process.exit(1)
    }
})
