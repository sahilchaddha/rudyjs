//
//  createRandomString.script.ts
//  R-U-D-Y
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 R-U-D-Y. All rights reserved.
//
/* tslint:disable curly object-literal-sort-keys */

import * as fs from "fs"
import * as path from "path"
import IScriptType from "./script"
import logger from "../utils/logger"

const payloadFileLocation = path.join(__dirname, "..", "payload", "payload.txt")
const charArray: string[] = ["R", "U", "D", "Y"]

class GeneratePayload implements IScriptType {

    private charCount: number
    private stream: fs.WriteStream

    constructor(charCount: number) {
        this.charCount = charCount
    }

    public run(): void {
        fs.unlink(payloadFileLocation, (err) => {
            logger.verbose({message: "payload.txt deleted", category: "GENERATE_PAYLOAD"})
            this.generatePayload()
          })
    }

    private generatePayload() {
        this.stream = fs.createWriteStream(payloadFileLocation)

        for (var i = 0; i < this.charCount; i++) {
            this.stream.write(this.getRandomString())
        }
        logger.info({message: "Payload Injected with characters : " + this.charCount,
                     category: "GENERATE_PAYLOAD"})
        this.stream.end()
    }

    private getRandomString(): string {
        const low: number = 0
        const high: number = 4
        const randomNumber: number = Math.floor(Math.random() * (high - low) + low)
        return charArray[randomNumber]
    }
}

export default GeneratePayload
