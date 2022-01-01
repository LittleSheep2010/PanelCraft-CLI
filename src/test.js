import crypto from "crypto"
import chalk from 'chalk'
import got from "got"
import { RequestError } from "got"

export default async function test(server, password, info) {
    if(info || info == null) {
        console.log(chalk.gray("Test connecting, please wait..."))
        console.log(chalk.gray("It won't take long..."))
    }
    try {
        const body = await got(`${server}`).json()
        if (body.status == "running") {
            if(password == null) {
                if(info || info == null) {
                    console.log(chalk.green("Connected!"))
                    console.log(chalk.gray("Provide password to test permission."))
                }
                return true
            }

            try {
                const body = await got.post(`${server}/status/permission`, {
                    json: {password: crypto.createHash('md5').update(password).digest("hex").toString()}
                }).json()
                if (!body["data"]) {
                    if(info || info == null) {
                        console.warn(chalk.yellow("Server connected! But password is wrong!"))
                    } else {
                        console.error(chalk.red("Password error!"))
                    }
                    return false
                }
                if(info || info == null) {
                    console.log(chalk.green("Connected!"))
                }
                return true
            } catch (err) {
                console.error("Unknown error: " + err.message)
                return false
            }
        } else {
            console.error(chalk.red(`Connect failed ${server}, cannot get server running status, may it isn't a PanelCraft server?`))
            return false
        }
    } catch (err) {
        if(err instanceof RequestError) {
            console.error(chalk.red(`Connect failed ${server}, because requets error(${err.code})`))
        } else {
            console.error("Unknown error: " + err.message)
        }
        return false
    }
}

export async function checkServer(url, password) {
    return await test(url, password, false)
}