import service from "./service.js";


class Controller {
    async rate(req, res) {
        const rate = await service.getRate()

        res.status(200).json(rate)
    }
}

export default new Controller()