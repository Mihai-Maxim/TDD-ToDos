import request from "supertest";
import app from "../../../../app.js";

describe("GET /todos", () => {

    const mockToDos =  {
        allTodos: [
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

    test("gets todo with skip", async () => {
        const response = await request(app)
        .get('/API/todos?skip=2')
        .set('Accept', 'application/json')
        expect(response.body.allTodos).toEqual(mockToDos.allTodos.slice(2))
        expect(response.status).toEqual(200);
    })

    test("gets todo with limit", async () => {
        const response = await request(app)
        .get('/API/todos?limit=2')
        .set('Accept', 'application/json')
        expect(response.body.allTodos).toEqual(mockToDos.allTodos.slice(0, 2))
        expect(response.status).toEqual(200);
    })
})