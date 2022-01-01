import got from "got"
import chalk from "chalk"

export default async (server, password, player, operation, amount) => {
    let data
    switch (operation) {
        case "add":
            data = await got.post(`${server}/console/vault/economy`, {json: {password: password, player: player, amount: amount, operation: "add"}}).json()
            if(data["error"] === "DataError") {
                console.log(chalk.red("Cannot found player: " + player))
            }
            if(data["status"] === "success") {
                console.log(chalk.green("Deposit player " + player + " balance " + amount))
            }
            break
        case "remove":
            data = await got.post(`${server}/console/vault/economy`, {json: {password: password, player: player, amount: amount, operation: "remove"}}).json()
            if(data["error"] === "DataError") {
                console.log(chalk.red("Cannot found player: " + player))
            }
            if(data["status"] === "success") {
                console.log(chalk.green("Withdrawals player " + player + " balance " + amount))
            }
            break
        default:
            data = await got.post(`${server}/console/vault/economy`, {json: {password: password, player: player}}).json()
            if(data["error"] === "DataError") {
                console.log(chalk.red("Cannot found player: " + player))
            }
            console.log("Player " + player + " balance is: " + data["data"])
            return
    }
}