import Project from "./models/ProjectModel.js";
import GeneralEssence from "./models/GeneralEssence.js";
import { generateRandomString } from "./utils/generateRandomString.js";
import { updateValue } from "./utils/recursiveUpdate.js";

export class Controller {
  async getData(req, res) {
    try {
      const data = await GeneralEssence.findOne({ id: req.params.eID })
        .select("projectName")
      return res.json(data.projectName ? [data.projectName] : []);
    } catch (error) {
      res.status(400).json({ message: "Ошибка получения данных", error });
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
      await GeneralEssence.create({ ...data, projectName: {} });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
  async createRow(req, res) {
    try {
      const data = await GeneralEssence.findOne({ id: req.params.eID })
        .select("projectName")
        .exec();
      const newData = updateValue(data.projectName, req.body, "create", req.body.parentId);
      await GeneralEssence.updateOne(
        { id: req.params.eID },
        { $set: { projectName: newData.changedObj } }
      );
    return res.status(200).json(newData.response);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
  async updateRow(req, res) {
    try {
      const data = await GeneralEssence.findOne({ id: req.params.eID })
        .select("projectName")
        .exec();
      const newData = updateValue(data.projectName, req.body);
      await GeneralEssence.updateOne(
        { id: req.params.eID },
        { $set: { projectName: newData.changedObj} }
      );

      res.status(200).json(newData.response);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
  async deleteRow(req, res) {
    try {
      const data = await GeneralEssence.findOne({ id: req.params.eID })
        .select("projectName")
        .exec();
      const newData = updateValue(data.projectName, parseInt(req.params.id), "delete");
      await GeneralEssence.updateOne(
        { id: req.params.eID },
        { $set: { projectName: newData.changedObj } }
      );

      res.status(200).json(newData.response);
    } catch (error) {
      res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
  }
}

export const controller = new Controller();
