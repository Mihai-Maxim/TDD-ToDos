import { dbConn } from "../db/conn.js"

export default async function getTodosHandler (req, res) {

    const allTodos = await dbConn.getAllToDos()
    
    res.status(200).json({
        allTodos
    })
}
