import { dbConn } from "../db/conn.js"
const TodosController = function (conn) {

    const getToDos = async function ({
        limit,
        skip,
        at
    }) {

        const allToDos = await conn.getAllToDos()
        
        return allToDos
    }

    return {
        getToDos
    }
}


const controller = TodosController(dbConn)

export {
    controller,
    TodosController
}


