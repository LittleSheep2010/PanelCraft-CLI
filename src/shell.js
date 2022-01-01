import status from "./status.js"
import placeholder from "./placeholder.js"
import vault from "./vault.js"
import power from "./power.js"
import executor from './executor.js';

import readline from "readline"
import chalk from "chalk"

export default async (server, password) => {
    const std_streams = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `${server.replaceAll("https://", "").replaceAll("http://", "")}@PanelCraft> `
    })

    std_streams.prompt()
    std_streams.on("line", async input => {
        const argv = input.split(" ")
        if (input !== "" || input !== null) {
            if (argv.length !== 0) {
                switch (argv[0]) {
                    case "status":
                        if (argv.length < 2) {
                            console.log(chalk.red("Status command require type parameter!"))
                            break
                        }
                        await status(server, password, argv[1])
                        break
                    case "vault":
                        if(argv.length == 2) {
                            console.log(chalk.grey("You are running vault query command. Vault command require player, operation and amount parameters!"))
                            await vault(server, password, argv[1])
                            break
                        }
                        if (argv.length < 4) {
                            console.log(chalk.red("Vault command require player, operation and amount parameters!"))
                            console.log(chalk.red("Vault query command just require player one parameter!"))
                            break
                        }
                        if(isNaN(parseFloat(argv[3]))) {
                            console.log(chalk.red("Parameter 4(amount) type need is float or number"))
                            break
                        }
                        await vault(server, password, argv[1], argv[2], argv[3])
                        break
                    case "placeholder":
                        if (argv.length < 3) {
                            console.log(chalk.red("Status command require player and message parameters!"))
                            break
                        }
                        await placeholder(server, password, argv[1], argv[2])
                        break
                    case "power":
                        if (argv.length < 2) {
                            console.log(chalk.red("Power command require type parameter!"))
                            break
                        }
                        await power(server, password, argv[1])
                        break
                    case "execute":
                        if (argv.length < 2) {
                            console.log(chalk.red("Execute command require command parameter!"))
                            break
                        }
                        await executor(server, password, Array.join(argv.slice(1, argv.length), " "))
                        break
                    case "exit":
                        console.log(chalk.green("Disconnected!"))
                        process.exit(0)
                        break
                    default:
                        if(argv[0].replaceAll(" ", "") !== "")
                            console.log(chalk.red("Command not found: " + argv[0]))
                        break
                }
            }
        }
        std_streams.prompt()
    })

    process.on("exit", () => std_streams.close())
}