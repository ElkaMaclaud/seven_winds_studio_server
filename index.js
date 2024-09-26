import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./router.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/v1/outlay-rows/entity", router);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD_DB}@cluster0.4wmgu.mongodb.net/sevenWindsStudio`)
    app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
  } catch (error) {
    console.log("Что-то пошло не так: ", error);
  }
};

start();
