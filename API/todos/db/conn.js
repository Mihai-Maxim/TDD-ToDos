

const todosDB = function (toDosList) {

    const todos = toDosList ?? [
        {
            title: "todo 1",
            description: "take the thrash"
        },
        {
            title: "todo 2",
            description: "clean the room"
        }
    ]

    const getAllToDos = async function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(todos)
            }, 200)
        })
    }

    

    const insertToDo = async function (todo, index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (index === undefined) {
                    todos.push(todo)
                    resolve(todos[todos.length - 1])
                }

                index < 0 ? index = Math.abs(todos.length - Math.abs(index) - 1) : null

                if (index < todos.length) {
                    todos.splice(index, 0, todo)
                    resolve(todos[index])
                }

                reject(new Error("invalid_index"))

            }, 200)
        })
    }

    const getToDo = async function (index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                index < 0 ? index = Math.abs(todos.length - Math.abs(index) - 1) : null
                resolve(todos[index] ?? null)
            }, 200)
        })
    }

    const removeToDo = async function (index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (index === undefined) {
                    const oldTodo = todos.pop()
                    resolve(oldTodo)
                }

                index < 0 ? index = Math.abs(todos.length - Math.abs(index) - 1) : null

                if (index < todos.length) {
                    const removedToDo = todos.splice(index, 1)
                    resolve(...removedToDo)
                }

                reject(new Error("invalid_index"))
            }, 200)
        })
    }


    const updateToDo = async function (index, update) {

        return new Promise(async (resolve, reject) => {

            const toDo = await getToDo(index)

            if (toDo) {
                const { title, description } = update
    
                if (title) {
                    toDo.title = title
                }
    
                if (description) {
                    toDo.description = description
                }

                resolve(toDo)
            }

            reject(new Error("invalid_index"))

        })
    }

    return {
        getAllToDos,
        insertToDo,
        getToDo,
        removeToDo,
        updateToDo
    }

}


const dbConn = todosDB()

export {
    dbConn,
    todosDB
}

