import Project from "./models/ProjectModel.js";
import GeneralEssence from "./models/GeneralEssence.js";
import { generateRandomString } from "./utils/generateRandomString.js";
import { updateValue } from "./utils/recursiveUpdate.js";

export class Controller {
  async getData(req, res) {
    try {
      const data = await GeneralEssence.findById(req.params.id)
        .select("child")
        .exec();
      return res.json(data);
    } catch (error) {
      res.status(400).json({ message: "Ошибка получения данных" });
    }
  }
  async createGeneralEssence(req, res) {
    try {
      const data = {
        id: parseInt(Math.random() * 10000 + 10000),
        rowName: `${generateRandomString(15)}-${generateRandomString(
          5
        )}-${generateRandomString(18)}`,
      };
      await GeneralEssence.create({ ...data, child: [] });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
  async createRow(req, res) {
    try {
      const data = await GeneralEssence.findById(req.params.id)
        .select("child")
        .exec();
      const newData = updateValue(data, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
  async updateRow(req, res) {
    try {
      const data = await GeneralEssence.findById(req.params.id)
        .select("child")
        .exec();
      const newData = updateValue(data, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
  async deleteRow(req, res) {
    try {
      const data = await GeneralEssence.findById(req.params.id)
        .select("child")
        .exec();
      const newData = updateValue(data, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
}

export const controller = new Controller();
