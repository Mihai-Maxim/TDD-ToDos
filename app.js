import express from "express"

import todosRouter from "./API/todos/router.js"
const app = express()

app.use("/API", todosRouter)


export default app