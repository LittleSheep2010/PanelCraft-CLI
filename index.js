#! /usr/bin/env node

import test from "./src/test.js"
import execute from "./src/controller/executor.js"
import power from "./src/controller/power.js"
import vaulteco from "./src/controller/vaulteco.js"
import placeholder from "./src/controller/placeholder.js"

import commander from "commander"

const program = new commander.Command()

program
    .command("test <server> [password]")
    .description("Connect to server")
    .action(async (server, password) => await test(server, password))

program
    .command("execute <command>")
    .requiredOption("-h, --host <host>", "Target server PanelCraft url")
    .requiredOption("-p, --password <password>", "Target server PanelCraft password")
    .description("Execute command on server")
    .action(async (command, options) => await execute(options["host"], options["password"], command))

program
    .command("power <command>")
    .requiredOption("-h, --host <host>", "Target server PanelCraft url")
    .requiredOption("-p, --password <password>", "Target server PanelCraft password")
    .description("Reload or shutdown server")
    .action(async (command, options) => await power(options["host"], options["password"], command))

program
    .command("vaulteco <player> [operation] [amount]")
    .requiredOption("-h, --host <host>", "Target server PanelCraft url")
    .requiredOption("-p, --password <password>", "Target server PanelCraft password")
    .description("Execute vault economy command")
    .action(async (player, operation, amount, options) => await vaulteco(options["host"], options["password"], player, operation, amount))

program
    .command("placeholder <player> <message>")
    .requiredOption("-h, --host <host>", "Target server PanelCraft url")
    .requiredOption("-p, --password <password>", "Target server PanelCraft password")
    .description("Process placeholder message")
    .action(async (player, message, options) => await placeholder(options["host"], options["password"], player, message))


program.parse(process.argv)
