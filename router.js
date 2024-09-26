import express from "express";
import { controller } from "./controller.js";

export const router = express.Router();
router.get("/:id/row/list", controller.getData);
router.post("/create", controller.createGeneralEssence);
router.post("/:eID/row/create", controller.createGeneralEssence)
router.post("/:eID/row/:id/update", controller.createGeneralEssence)
router.delete("/:eID/row/:id/delete", controller.createGeneralEssence)
