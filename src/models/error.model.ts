//
//  error.model.ts
//  Tribe-cms
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 Tribe-CMS.tv. All rights reserved.
//

export interface IError {
    code: number
    message: string
    category: string
    data?: object
}

export const TargetNotFound: IError = {code: 404, category: "CLI", message: "Target Not Found."}
