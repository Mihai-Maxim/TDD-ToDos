import { TodosController } from "../../../../API/todos/controller/todos.js"
import { todosDB } from "../../../../API/todos/db/conn.js"

const dbConn = todosDB([
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
        description: "learn some tdd"
    },
    {
        title: "todo 4",
        description: "world domination"
    }
])

const { getToDos } = TodosController(dbConn)

describe.skip("controller.getToDos works as expected", () => {
    test("at works", async () => {
        const query = {
            at: 1
        }

        const todos = await getToDos(query)

        expect(todos[0]).toEqual({
            title: "todo 2",
            description: "clean the room"
        })
    })


    test("at works with negative index", async () => {
        const query = {
            at: -1
        }

        const todos = await getToDos(query)

        expect(todos[0]).toEqual({
            title: "todo 3",
            description: "learn some tdd"
        })
    })


    test("at=last works", async () => {
        const query = {
            at: "last"
        }

        const todos = await getToDos(query)

        expect(todos[0]).toEqual({
            title: "todo 4",
            description: "world domination"
        })
    })

    test("at works with skip and limit", async () => {

        const query = {
            at: 1,
            skip: 1,
            limit: 2
        }

        const todos = await getToDos(query)

        expect(todos[0]).toEqual({
            title: "todo 3",
            description: "learn some tdd"
        })

    })


    test("negative at works with skip and limit", async () => {
        const query = {
            at: -1,
            skip: 1,
            limit: 2
        }

        const todos = await getToDos(query)

        expect(todos[0]).toEqual({
            title: "todo 2",
            description: "clean the room"
        })
    })


    test("at=last works with skip and limit", async () => {
        const query = {
            at: "last",
            skip: 1,
            limit: 2
        }

        const todos = await getToDos(query)

        expect(todos[0]).toEqual({
            title: "todo 3",
            description: "learn some tdd"
        })
    })


    test("returns empty array if skip > todos.length", async () => {
        const query = {
            skip: 5,
        }

        const todos = await getToDos(query)

        expect(todos).toEqual([])
    })
})