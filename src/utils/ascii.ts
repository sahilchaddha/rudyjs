//
//  ascii.ts
//  Tribe-cms
//
//  Created by Sahil Chaddha on 08/05/2018.
//  Copyright © 2018 Tribe-CMS.tv. All rights reserved.
//

const figlet = require("figlet")
import * as Constants from "./constants"
/* tslint:disable no-console */

class ASCIIBanner {
    public static showInfo() {
        figlet(Constants.projectName, (err, data) => {
            if (err) {
                return
            }
            console.log(data)
            console.log("Author : " + Constants.authorName)
            console.log("Website: " + Constants.authorWebsite)
            console.log("Github : " + Constants.authorGithubLink)
        })
    }
}

export default ASCIIBanner
