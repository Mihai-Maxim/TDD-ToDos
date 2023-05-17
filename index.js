import express from "express"

import todosRouter from "./API/todos/router.js"
const app = express()

app.use("/API/todos", todosRouter)

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})

