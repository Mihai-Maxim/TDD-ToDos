import request from "supertest";
import app from "../../../../app.js";

describe("GET /todos", () => {

    const mockToDos =  {
        todos: [
          { title: 'todo 1', description: 'take the thrash' },
          { title: 'todo 2', description: 'clean the room' },
          { title: 'todo 3', description: 'learn some tdd' },
          { title: 'todo 4', description: 'world domination' }
        ]
    }

    test("gets all todos", async () => {
        const response = await request(app)
        .get('/API/todos')
        .set('Accept', 'application/json')
        expect(response.body).toEqual(mockToDos)
        expect(response.status).toEqual(200);
    })

    test("gets last todo", async () => {
        const response = await request(app)
        .get('/API/todos?at=last')
        .set('Accept', 'application/json')
        expect(response.body.todos).toEqual(mockToDos.todos[3])
        expect(response.status).toEqual(200);
    })

    test("gets todos with skip", async () => {
        const response = await request(app)
        .get('/API/todos?skip=2')
        .set('Accept', 'application/json')
        expect(response.body.todos).toEqual(mockToDos.todos.slice(2))
        expect(response.status).toEqual(200);
    })

    test("gets todos with limit", async () => {
        const response = await request(app)
        .get('/API/todos?limit=2')
        .set('Accept', 'application/json')
        expect(response.body.todos).toEqual(mockToDos.todos.slice(0, 2))
        expect(response.status).toEqual(200);
    })

    test("gets todos with skip and limit", async () => {
        const response = await request(app)
        .get('/API/todos?skip=1&limit=2')
        .set('Accept', 'application/json')
        expect(response.body.todos).toEqual(mockToDos.todos.slice(1, 2))
        expect(response.status).toEqual(200);
    })

    test("gets todo at specific index", async () => {
        const response = await request(app)
        .get('/API/todos?at=1')
        .set('Accept', 'application/json')
        expect(response.body.todos[0]).toEqual(mockToDos.todos[1])
        expect(response.body.todos.length).toBe(1)
        expect(response.status).toEqual(200);
    })

    test("gets todo at specific index with skip and limit", async () => {
        const response = await request(app)
        .get('/API/todos?skip=1&at=1&limit=2')
        .set('Accept', 'application/json')
        expect(response.body.todos).toEqual(mockToDos.todos[2])
        expect(response.status).toEqual(200);
    })


    test("returns 400 for negative skip", async () => {
        const response = await request(app)
        .get('/API/todos?skip=-1')
        .set('Accept', 'application/json')
        expect(response.body.todos).toEqual(mockToDos.todos[2])
        expect(response.status).toEqual(200);
    })


    test("returns 400 for negative limit", async () => {
        const response = await request(app)
        .get('/API/todos?limit=-2')
        .set('Accept', 'application/json')
        expect(response.body.todos).toEqual(mockToDos.todos[2])
        expect(response.status).toEqual(400);
    })


    describe("returns empty array if todo is not found", () => {

        test("if not found at", async () => {
            const response = await request(app)
            .get('/API/todos?at=100')
            .set('Accept', 'application/json')
            expect(response.body.todos).toEqual([])
            expect(response.status).toEqual(400);
        })


        test("if at is not found between skip and limit", async () => {
            const response = await request(app)
            .get('/API/todos?skip=1&limit=3&at=100')
            .set('Accept', 'application/json')
            expect(response.body.todos).toEqual([])
            expect(response.status).toEqual(400);
        })

        test("if skip > todos.length", async () => {
            const response = await request(app)
            .get('/API/todos?skip=100')
            .set('Accept', 'application/json')
            expect(response.body.todos).toEqual([])
            expect(response.status).toEqual(400);
        })


    })

})