//
//  createRandomString.script.ts
//  Tribe-cms
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 Tribe-CMS.tv. All rights reserved.
//
/* tslint:disable curly object-literal-sort-keys */

import * as fs from "fs"
import * as path from "path"
import IScriptType from "./script"
import logger from "../utils/logger"

const payloadFileLocation = path.join(__dirname, "..", "payload", "payload.txt")

class GeneratePayload implements IScriptType {

    private numberOfLines: number
    private stream: fs.WriteStream

    constructor(numberOfLines: number) {
        this.numberOfLines = numberOfLines
    }

    public run(): void {
        fs.unlink(payloadFileLocation, (err) => {
            logger.verbose({message: "payload.txt deleted", category: "GENERATE_PAYLOAD"})
            this.generatePayload()
          })
    }

    private generatePayload() {
        this.stream = fs.createWriteStream(payloadFileLocation)

        for (var i = 0; i < this.numberOfLines; i++) {
            this.stream.write(this.getRandomString() + "\n")
        }
        logger.info({message: "Payload Updated with number of lines : " + this.numberOfLines,
                     category: "GENERATE_PAYLOAD"})
        this.stream.end()
    }

    private getRandomString(): string {
        var randomString: string = ""
        for (var i = 0; i < 100; i++) {
            randomString = randomString + " RUDY "
        }
        return randomString
    }
}

export default GeneratePayload
