import got from "got"
import chalk from "chalk"
import crypto from "crypto"
import { checkServer } from "../test.js"

export default async (url, password, command) => {
    if(!await checkServer(url, password)) {
        return
    }
    switch (command) {
        case "reload":
            try {
                let {statusCode} = await got.post(`${url}/console/reload`, {json: {password: crypto.createHash('md5').update(password).digest("hex").toString()}})
                if(statusCode === 200) {
                    console.log(chalk.green("Reloaded, please wait a moment and you can connect agian!"))
                    process.exit(0)
                }
                break
            } catch (err) {
                console.log(chalk.red("Failed to reload. Because: " + err.message))
            }
        case "shutdown":
            try {
                let {statusCode} = await got.post(`${url}/console/poweroff`, {json: {password: crypto.createHash('md5').update(password).digest("hex").toString()}})
                if(statusCode === 200) {
                    console.log(chalk.green("Server is shutdowned!"))
                    process.exit(0)
                }
                break
            } catch (err) {
                console.log(chalk.red("Failed to shutdown. Because: " + err.message))
            }
        default:
            console.log(chalk.red("Unknown power command: " + command))
            return
    }
}