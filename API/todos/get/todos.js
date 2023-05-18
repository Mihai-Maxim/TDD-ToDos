import { dbConn } from "../db/conn.js"
import controller from "../controller/todos.js"
export default async function getTodosHandler (req, res) {

    const allTodos = await dbConn.getAllToDos()

    controller.getToDos(req.query)



    res.status(200).json({
        todos: allTodos
    })
}
