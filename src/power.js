import got from "got"
import chalk from "chalk"

export default async (server, password, type) => {
    switch (type) {
        case "reload":
            try {
                let {statusCode} = await got.post(`${server}/console/reload`, {json: {password: password}})
                if(statusCode === 200) {
                    console.log(chalk.green("Reloaded, please wait a moment and restart PanelCraft commandline."))
                    process.exit(0)
                } else {
                    console.log(chalk.red("Failed to reload. Please restart PanelCraft commandline."))
                }
                break
            } catch (e) {
                console.log(chalk.red("Failed to reload. Please restart PanelCraft commandline."))
            }
        case "shutdown":
            try {
                let {statusCode} = await got.post(`${server}/console/poweroff`, {json: {password: password}})
                if(statusCode === 200) {
                    console.log(chalk.green("Server is power off! Disconnected."))
                    process.exit(0)
                } else {
                    console.log(chalk.red("Failed to power off server. Please restart PanelCraft commandline."))
                }
                break
            } catch (e) {
                console.log(chalk.red("Failed to power off server. Please restart PanelCraft commandline."))
            }
        default:
            console.log(chalk.red("Unknown power type: " + type))
            return
    }
}