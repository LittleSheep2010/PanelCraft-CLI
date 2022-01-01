import got from "got"
import chalk from "chalk"

export default async (server, password, command) => {
    const data = await got.post(`${server}/execute`, {json: {password: password, command: command}}).json()
    if(data["status"] === "success") {
        console.log("Response message:")
        for(const message of data["data"]) {
            console.log(message)
        }
    }
}