//
//  stream.service.ts
//  RUDY
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 RUDY. All rights reserved.
//
/* tslint:disable object-literal-sort-keys no-this-assignment */

import { Readable } from "stream"
import * as fs from "fs"
import * as path from "path"
import IService from "./service"
import logger from "../utils/logger"

export interface IStreamConfig {
    delay: number
}

class StreamService implements IService {
    private static cachedPayload: string = null
    public serviceName: string = "Stream_Service"
    private delay: number
    private stream: Readable

    constructor(config: IStreamConfig) {
        this.delay = config.delay
        this.stream = new Readable()
        this.stream._read = () => {
            setTimeout(() => {
                if (StreamService.cachedPayload == null) {
                    const payload = this.getPayload()
                    StreamService.cachedPayload = payload
                }
                this.stream.push(StreamService.cachedPayload)
            }, this.delay * 1000)  // into Seconds
        }
    }

    public getRandomReadStream() {
        return this.stream
    }

    public endStream() {
        logger.verbose({message: "Closing Stream", category: this.serviceName})
        this.stream.destroy()
    }

    private getPayload(): string {
        logger.verbose({message: "Reading file payload.txt", category: this.serviceName})
        return fs.readFileSync(path.join(__dirname, "..", "payload", "payload.txt"), "utf8").toString()
    }
}

export default StreamService
