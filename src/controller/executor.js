import chalk from "chalk"
import got from "got"
import crypto from "crypto"
import { checkServer } from "../test.js"

export default async (url, password, command) => {
    if(!await checkServer(url, password)) {
        return
    }
    try {
        const data = await got.post(`${url}/console/execute`, {json: {password: crypto.createHash('md5').update(password).digest("hex").toString(), command: command}}).json()
        if(data["status"] === "success") {
            console.log("Response message:")
            for(const message of data["data"]) {
                console.log(message)
            }
        }
    } catch (err) {
        console.log(chalk.red("Execute failed: " + err.message))
        return
    }
}