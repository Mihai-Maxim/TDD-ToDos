import express from "express"
import getToDosHandler from "./get/todos.js"
import parseQueryParams from "./middelware/parseQueryParams.js"

const { parseGetToDos } = parseQueryParams

const router = express.Router()


router.get("/todos", parseGetToDos, getToDosHandler)


export default router

