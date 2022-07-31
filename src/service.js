import fetch from "node-fetch";
import * as constants from "constants";
import fs from 'fs'
import * as util from "util";
import e from "express";

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8');
const writeFile = (fileName, data) => util.promisify(fs.writeFile)(fileName, data, 'utf8');

const origin = 'api.coingecko.com'
const path = '/api/v3/simple/price'
const crypto = 'bitcoin'
const currency = 'uah'

const dataPath = process.env.DATA_PATH ?? './data'

fs.access(dataPath, (err) => {
    if (err) {
        fs.mkdir(dataPath, (err) => {
            if (err) {
                console.log(error)
                process.exit(1)
            } else {
                console.log("Data directory created")
            }
        });
    }
});

class Service {

    async getRate() {
        const res = await fetch(`https://${origin}${path}?ids=${crypto}&vs_currencies=${currency}`)
        const json = await res.json()

        return json.bitcoin.uah
    }


    async saveEmail(email) {
        const file = `${dataPath}/emails.json`
        let  emails = []

        try {
             emails = JSON.parse(await readFile(file))
        } catch (e) {
            console.log('File don`t exist')
        }

        if (!emails.includes(email)) {
            emails.push(email)
            await writeFile(file, JSON.stringify(emails))
            return true
        }
        return false
    }





}


export default new Service()