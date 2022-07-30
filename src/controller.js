import service from "./service.js";

class Controller {
    async rate(req, res) {
        const rate = await service.getRate()

        res.status(200).json(rate)
    }

    async subscribe(req, res) {
        const mail = req.body.email

        const result = await service.saveEmail(mail)

        if(result)
            return res.sendStatus(200)
        else
            return res.sendStatus(409)
    }
}

export default new Controller()