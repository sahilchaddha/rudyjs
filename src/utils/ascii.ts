//
//  ascii.ts
//  RUDY
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 RUDY. All rights reserved.
//

const figlet = require("figlet")
import * as Constants from "./constants"
/* tslint:disable no-console */

class ASCIIBanner {
    public static showInfo(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            figlet(Constants.projectName, (err, data) => {
                // No Need to Reject, Its fine if Banner is not shown
                if (err) {
                    return resolve(false)
                }
                console.log(data)
                console.log("Author : " + Constants.authorName)
                console.log("Website: " + Constants.authorWebsite)
                console.log("Github : " + Constants.authorGithubLink)
                return resolve(true)
            })
        })
    }
}

export default ASCIIBanner
