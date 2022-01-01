import got from "got"
import chalk from "chalk"
import crypto from "crypto"

export default async (url, password, player, operation, amount) => {
    let data
    switch (operation) {
        case "add":
            data = await got.post(`${url}/console/vault/economy`, {json: {password: crypto.createHash('md5').update(password).digest("hex").toString(), player: player, amount: amount, operation: "add"}, throwHttpErrors: false}).json()
            if(data["error"] === "DataError") {
                console.log(chalk.red("Cannot found player: " + player))
            }
            if(data["error"] === "ModuleUnactivatedError") {
                console.log(chalk.red("Server didn't install Vault or Economy plugin!"))
            }
            if(data["status"] === "success") {
                console.log(chalk.green("Deposit player " + player + " balance " + amount))
            }
            break
        case "remove":
            data = await got.post(`${url}/console/vault/economy`, {json: {password: crypto.createHash('md5').update(password).digest("hex").toString(), player: player, amount: amount, operation: "remove"}, throwHttpErrors: false}).json()
            if(data["error"] === "DataError") {
                console.log(chalk.red("Cannot found player: " + player))
            }
            if(data["error"] === "ModuleUnactivatedError") {
                console.log(chalk.red("Server didn't install Vault or Economy plugin!"))
            }
            if(data["status"] === "success") {
                console.log(chalk.green("Withdrawals player " + player + " balance " + amount))
            }
            break
        default:
            data = await got.post(`${url}/console/vault/economy`, {json: {password: crypto.createHash('md5').update(password).digest("hex").toString(), player: player}, throwHttpErrors: false}).json()
            if(data["error"] === "DataError") {
                console.log(chalk.red("Cannot found player: " + player))
                return
            }
            if(data["error"] === "ModuleUnactivatedError") {
                console.log(chalk.red("Server didn't install Vault or Economy plugin!"))
                return
            }
            console.log("Player " + player + " balance is: " + data["data"])
            return
    }
}