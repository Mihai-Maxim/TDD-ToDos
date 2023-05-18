import { dbConn } from "../db/conn.js"

export default async function getTodosHandler (req, res) {

    const allTodos = await dbConn.getAllToDos()
    const { skip, limit, at } = req.query
    
    res.status(200).json({
        todos: allTodos
    })
}
