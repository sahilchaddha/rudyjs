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

// Shows ASCII banner
ASCIIBanner.showInfo()

// Parse Arguments
program
.version("1.0.0", "-v, --version")
.option("-h, --host", "Host to attack")
.parse(process.argv)
