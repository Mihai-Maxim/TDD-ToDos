import { todosDB } from "../../../../API/todos/db/conn";


describe("todos/db test", () => {
    let dbConn

    let mockTodos1

    beforeEach(async () => {
        mockTodos1 = [
            {
                title: "todo 1",
                description: "take the thrash"
            },
            {
                title: "todo 2",
                description: "clean the room"
            },
            {
                title: "todo 3",
                description: "touch grass"
            }
        ]
        dbConn = new todosDB(JSON.parse(JSON.stringify(mockTodos1)))
    })

    test("gets all todos", async () => {
        const allTodos = await dbConn.getAllToDos()
        expect(allTodos).toEqual(expect.arrayContaining(mockTodos1));
    })


    test("gets a todo at index", async () => {
        const todo = await dbConn.getToDo(1)
        expect(mockTodos1[1]).toEqual(todo)
    })

    test("gets a todo at negative index", async () => {
        const todo = await dbConn.getToDo(-1)
        expect(mockTodos1[1]).toEqual(todo)
    })

    test("gets null if invalid index", async () => {
        const todo = await dbConn.getToDo(4)
        expect(null).toEqual(todo)
    })

    test("inserts a todo at the end", async () => {
        const insertedToDo = await dbConn.insertToDo({
            title: "todo 4",
            description: "test insert"
        })

        expect(insertedToDo).toEqual({
            title: "todo 4",
            description: "test insert"
        })
    })

    test("inserts a todo at specified index", async () => {

        const insertedToDo = await dbConn.insertToDo({
            title: "todo 4",
            description: "test insert"
        }, 1)

        expect(insertedToDo).toEqual({
            title: "todo 4",
            description: "test insert"
        })

        const currentToDo = await dbConn.getToDo(1)

        expect(currentToDo).toEqual(insertedToDo)
    })

    test("inserts a todo at specified negative index", async () => {
        
        const insertedToDo = await dbConn.insertToDo({
            title: "todo 4",
            description: "test insert"
        }, -1)

        expect(insertedToDo).toEqual({
            title: "todo 4",
            description: "test insert"
        })

        const currentToDo = await dbConn.getToDo(1)

        expect(currentToDo).toEqual(insertedToDo)
    })

    test("rejects insert at invalid index", async () => {
        expect.assertions(1);

        return expect(dbConn.insertToDo({
            title: "todo 4",
            description: "test insert"
        }, 10)).rejects.toEqual(new Error("invalid_index"))

    })


    test("rejects insert at invalid negative index", async () => {
        expect.assertions(1);

        return expect(dbConn.insertToDo({
            title: "todo 4",
            description: "test insert"
        }, -10)).rejects.toEqual(new Error("invalid_index"))

    })

    test("removes a todo at the end", async () => {
        const beforeRemove = mockTodos1[mockTodos1.length - 1]

        const removedToDo = await dbConn.removeToDo()

        const allToDos = await dbConn.getAllToDos()

        expect(allToDos[allToDos.length - 1]).not.toEqual(removedToDo)

        expect(removedToDo).toEqual(beforeRemove)

    })

    test("removes a todo at specified index", async () => {
        const beforeRemove = mockTodos1[1]

        const removedToDo = await dbConn.removeToDo(1)

        const allToDos = await dbConn.getAllToDos()

        expect(allToDos[allToDos.length - 1]).not.toEqual(removedToDo)

        expect(removedToDo).toEqual(beforeRemove)
    })

    test("removes a todo at specified negative index", async () => {
        const beforeRemove = mockTodos1[1]

        const removedToDo = await dbConn.removeToDo(-1)

        const allToDos = await dbConn.getAllToDos()

        expect(allToDos[allToDos.length - 1]).not.toEqual(removedToDo)

        expect(removedToDo).toEqual(beforeRemove)
    })

    test("rejects remove at invalid index", async () => {
        expect.assertions(1);

        return expect(dbConn.removeToDo(10)).rejects.toEqual(new Error("invalid_index"))
    })

    test("rejects remove at invalid negative index", async () => {
        expect.assertions(1);

        return expect(dbConn.removeToDo(-10)).rejects.toEqual(new Error("invalid_index"))
    })

    test("updates a todo", async () => {
       const updatedToDo = await dbConn.updateToDo(0, {
            title: "updated title",
            description: "updated description"
       })

       const allToDos = await dbConn.getAllToDos()

       expect(allToDos[0]).toEqual({
            title: "updated title",
            description: "updated description"
       })

    })

    test("partially updates a todo", async () => {
       let updatedToDo = await dbConn.updateToDo(0, {
            title: "updated title",
       })

       let allToDos = await dbConn.getAllToDos()

       expect(allToDos[0].title).toEqual("updated title")
       expect(allToDos[0].description).not.toEqual("updated description")


       updatedToDo = await dbConn.updateToDo(0, {
           description: "updated description",
       })

       allToDos = await dbConn.getAllToDos()
       expect(allToDos[0].description).toEqual("updated description")


    })

    test("rejects update at invalid index", async () => {
        expect.assertions(1);

        return expect(dbConn.updateToDo(20, {
            title: "updated title",
            description: "updated description"
        })).rejects.toEqual(new Error("invalid_index"))
    })


})