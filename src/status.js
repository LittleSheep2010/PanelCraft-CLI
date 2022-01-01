import got from "got"
import chalk from "chalk"

export default async (server, password, type) => {
    switch (type) {
        case "database":
            const data = await got.get(`${server}/status/database`).json()
            console.log("Database Status: ")
            console.log(`3 second: ${data["threeSecondTest"] ? chalk.green("OK") : chalk.red("Error")}`)
            console.log(`30 second: ${data["thirtySecondTest"] ? chalk.green("OK") : chalk.red("Error")}`)
            break
        default:
            console.log(chalk.red("Unknown status type: " + type))
            return
    }
}