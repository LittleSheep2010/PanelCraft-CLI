import got from "got"
import chalk from "chalk"
import crypto from "crypto"
import { checkServer } from "../test.js"

export default async (url, password, player, message) => {
    if(!await checkServer(url, password)) {
        return
    }
    const data = await got.post(`${url}/console/placeholder/process`, {json: {password: crypto.createHash('md5').update(password).digest("hex").toString(), player: player, message: message}, throwHttpErrors: false}).json()
    if(data["error"] === "DataError") {
        console.log(chalk.red("Cannot found player: " + player))
    }
    if(data["error"] === "ModuleUnactivatedError") {
        console.log(chalk.red("Server didn't install placeholderAPI plugin!"))
    }
    if(data["status"] === "success") {
        console.log("Message:")
        console.log(data["data"])
    }
}