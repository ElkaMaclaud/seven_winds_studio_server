import express from "express";
import { controller } from "./controller.js";

export const router = express.Router();
router.get("/:eID/row/list", controller.getData);
router.post("/create", controller.createGeneralEssence);
router.post("/:eID/row/create", controller.createRow)
router.post("/:eID/row/:id/update", controller.updateRow)
router.delete("/:eID/row/:id/delete", controller.deleteRow)
