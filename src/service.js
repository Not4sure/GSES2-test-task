import fetch from "node-fetch";

const origin = 'api.coingecko.com'
const path = '/api/v3/simple/price'
const crypto = 'bitcoin'
const currency = 'uah'

class Service {

    async getRate() {
        const res = await fetch(`https://${origin}${path}?ids=${crypto}&vs_currencies=${currency}`)
        const json = await res.json()

        return json.bitcoin.uah
    }

}


export default new Service()