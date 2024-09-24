import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const start = async() => {
    try {
        // await mongoose.connect()
        app.listen(PORT, console.log(`Сервер запущен на порте ${PORT}`))
    } catch(error) {
        console.log("Что-то пошло не так: ", error)
    }
}

start()