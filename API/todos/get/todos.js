import { dbConn } from "../db/conn.js"

export default async function getTodosHandler (req, res) {

    const allTodos = await dbConn.getAll()
    
    res.json({
        allTodos
    })
}