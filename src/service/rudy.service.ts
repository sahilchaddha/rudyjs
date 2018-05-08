//
//  rudy.service.ts
//  Tribe-cms
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 Tribe-CMS.tv. All rights reserved.
//

import logger, { LogLevel } from "../utils/logger"
import * as Error from "../models/error.model"
const logCategory: string = "RUDY_SERVICE"

export interface IRudyConfig {
    target: string
    maxConnections?: number
    userAgent?: string
    delay?: number
    verbose?: boolean
}

class RudyService {
    private config: IRudyConfig

    constructor(config: IRudyConfig) {
        this.config = config
        this.setLogLevel()
    }

    public attack(): Promise<boolean> {
        logger.info({message: "Starting Attack at " + this.config.target, category: "RUDY"})
        return this.isValidTarget(this.config.target)
    }

    private setLogLevel() {
        if (this.config.verbose) {
            logger.setLogLevel(LogLevel.VERBOSE)
        }
    }

    private isValidTarget(target: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject({message: "hihi", category: "joj"})
        })
    }
}

export default RudyService
