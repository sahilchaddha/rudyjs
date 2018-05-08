//
//  network.service.ts
//  RUDY
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 RUDY. All rights reserved.
//

import * as request from "request"
import logger from "../utils/logger"
import IService from "./service"
const tr = require("tor-request")

/* tslint:disable member-ordering object-literal-sort-keys */

export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
}

export interface IRequestPayload {
    url: string
    method: HTTPMethod
    headers?: request.Headers
    data?: any
}

export interface IResponsePayload {
    status: number
    message: number
    data?: any
}

class NetworkService implements IService {
    public serviceName: string = "Network_Service"
    public static request(payload: IRequestPayload): Promise<IResponsePayload> {
        return new Promise<IResponsePayload>((resolve, reject) => {
            request({
                method: payload.method,
                uri: payload.url,
                headers: payload.headers,
                formData: {
                    file: payload.data,
                },
              },
            (error, response, body) => {
                if (error) {
                  return reject({code: response.statusCode, err: error})
                }
                return resolve({status: response.statusCode, message: body})
              })
        })
    }
    public static torRequest(payload: IRequestPayload): Promise<IResponsePayload> {
        return new Promise<IResponsePayload>((resolve, reject) => {
            tr.request("https://api.ipify.org", (err, res, body) => {
                    if (!err && res.statusCode === 200) {
                        // console.log("Your public (through Tor) IP is: " + body)
                        }
            })
            return {}
        })
    }
}

export default NetworkService
