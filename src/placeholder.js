import got from "got"
import chalk from "chalk"

export default async (server, password, player, message) => {
    const data = await got.post(`${server}/placeholder/process`, {json: {password: password, player: player, message: message}}).json()
    if(data["error"] === "DataError") {
        console.log(chalk.red("Cannot found player: " + player))
    }
    if(data["status"] === "success") {
        console.log("Message:")
        console.log(data["data"])
    }
}