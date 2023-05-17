import express from "express"
import getTodosHandler from "./get/todos.js"

const router = express.Router()


router.get("/todos", getTodosHandler)


export default router

