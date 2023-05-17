import request from "supertest";
import app from "../../../../app.js";

describe("gets todos", () => {
    test("gets all todos", () => {
        request(app)
            .get("/API/todos")
            .expect(200)
    })
})