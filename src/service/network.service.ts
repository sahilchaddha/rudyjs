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
    shouldUseTor: boolean
}

export interface IResponsePayload {
    status: number
    message: number
    data?: any
}

export interface ITorConfig {
    url: string
    port: number
}

class NetworkService implements IService {
    public serviceName: string = "Network_Service"

    public static setTorAddress(config: ITorConfig) {
        tr.setTorAddress(
            (config.url != null ? config.url : "127.0.0.1"),
            (config.port != null ? config.port : 9050))
    }

    public static request(payload: IRequestPayload): Promise<IResponsePayload> {
        if (payload.shouldUseTor) {
            return NetworkService.torRequest(payload)
        }
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
                  return reject({code: 404, err: error})
                }
                return resolve({status: response.statusCode, message: body})
              })
        })
    }
    private static torRequest(payload: IRequestPayload): Promise<IResponsePayload> {
        return new Promise<IResponsePayload>((resolve, reject) => {
            tr.request({
                method: payload.method,
                uri: payload.url,
                headers: payload.headers,
                formData: {
                    file: payload.data,
                },
              },
            (error, response, body) => {
                if (error) {
                  return reject({code: 404, err: error})
                }
                return resolve({status: response.statusCode, message: body})
              })
        })
    }
}

export default NetworkService
