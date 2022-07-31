import fetch from 'node-fetch'
import nodemailer from 'nodemailer'
import {readFile, writeFile, dataPath} from './utils.js'
import {config} from "dotenv"
config({path: '.env'})

const origin = 'api.coingecko.com'
const path = '/api/v3/simple/price'
const crypto = 'bitcoin'
const currency = 'uah'

const from = process.env.MAIL_USER


console.log( {
    user: from,
    password: process.env.MAIL_PASSWORD
})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
        user: from,
        password: process.env.MAIL_PASSWORD
    }
})

class Service {

    async getRate() {
        const res = await fetch(`https://${origin}${path}?ids=${crypto}&vs_currencies=${currency}`)
        const json = await res.json()

        return json.bitcoin.uah
    }

    async getEmails() {
        const file = `${dataPath}/emails.json`

        let emails = []

        try {
            emails = JSON.parse((await readFile(file)).toString())
        } catch (e) {
            console.log('File was not created yet')
        }
        return emails
    }


    async saveEmail(email) {
        const file = `${dataPath}/emails.json`
        const emails = await this.getEmails()

        if (!emails.includes(email)) {
            emails.push(email)
            await writeFile(file, JSON.stringify(emails))
            return true
        }
        return false
    }

    async sendEmails() {
        const rate = await this.getRate()
        const emails = await this.getEmails()

        console.log(from)

        const mailOptions = {
            from,
            subject: 'New bitcoin rate',
            text: `Currently one bitcoin costs ${rate} UAH`
        }

        for(const mail of emails) {
            await transporter.sendMail({to: mail, ...mailOptions}, (err, info) => {
                if(err)
                    console.log(err)
                else
                    console.log(info.response)
            })
        }
    }

}


export default new Service()