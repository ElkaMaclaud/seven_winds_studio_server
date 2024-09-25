import Reject from "./models/ProjectModel"

export class Controller {
    async getData(req, res) {
        try {
            const data = await Reject.find(req.param.id)
            return res.json(data)
        } catch(error) {
            res.status(400).json({message: "Ошибка получения данных"})
        }
    }
}



