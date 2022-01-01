#! /usr/bin/env node

import shell from "./src/shell.js"

import got from "got"
import chalk from "chalk"
import commander from "commander"
import crypto from "crypto"

const program = new commander.Command()

program
    .command("connect <server> <password>")
    .description("Connect to server")
    .action(async (server, password) => {
        const options = {
            prefixUrl: server,
        }
        console.log("Connecting, please wait...")
        console.log("It won't take long...")
        try {
            const body = await got(``, options).json()
            if (body.status == "running") {
                const body = await got.post(`status/permission`, {
                    ...options,
                    json: {password: crypto.createHash('md5').update(password).digest("hex").toString()}
                }).json()
                if (!body["data"]) {
                    console.error(chalk.red(`Failed to connect ${server}, password error`))
                    process.exit(1)
                }
                console.log(chalk.green("Connected!"))
                shell(server, crypto.createHash('md5').update(password).digest("hex").toString())
            } else {
                console.error(chalk.red(`Failed to connect ${server}, may it isn't a PanelCraft server?`))
                process.exit(1)
            }
        } catch (err) {
            console.error(chalk.red(`Failed to connect ${server}, because ${err}`))
            process.exit(1)
        }
    })

program.parse(process.argv)
