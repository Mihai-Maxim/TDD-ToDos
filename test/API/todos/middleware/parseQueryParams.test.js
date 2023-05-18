import parseQueryParams from "../../../../API/todos/middelware/parseQueryParams.js"
const { parseGetToDos }  = parseQueryParams
import {jest} from '@jest/globals'
describe.only("parseGetToDos works as expected", () => {
    
    let mockRes

    const getMockRes = () => {
        return mockRes = {
            status: jest.fn((s) => {
                return {
                    json: jest.fn((d) => {
                        // console.log(d)
                    })
                }
            })
        }
    }

    beforeEach(() => {
        mockRes = getMockRes()
    })

  
    test("rejects non-number limit", (done) => {
        const mockReq1 = {
            query: {
                limit: "abc",
            }
        }
    
        expect.assertions(2)
    
        parseGetToDos(mockReq1, mockRes, () => {})
    
        expect(mockRes.status.mock.calls[0][0]).toBe(400)

        expect(mockRes.status.mock.results[0].value.json.mock.lastCall[0]).toEqual({
            message: 'limit must be a positive integer'
        })

        done()


    })

    test("rejects non-number skip", (done) => {
        const mockReq2 = {
            query: {
                skip: "fffgh"
            }
        }
    
        expect.assertions(2)
    
        parseGetToDos(mockReq2, mockRes, () => {})

        expect(mockRes.status.mock.calls[0][0]).toBe(400)

        expect(mockRes.status.mock.results[0].value.json.mock.lastCall[0]).toEqual({
            message: 'skip must be a positive integer'
        })

        done()
    })

    
    test("rejects non-number at", (done) => {
        const mockReq3 = {
            query: {
                at: "fffgh"
            }
        }
    
        expect.assertions(2)
        parseGetToDos(mockReq3, mockRes, () => {})
        expect(mockRes.status.mock.calls[0][0]).toBe(400)

        expect(mockRes.status.mock.results[0].value.json.mock.lastCall[0]).toEqual({
            message: "at must be an integer or 'last'"
        })

        done()
    })
    
    

    test("casts limit to int", (done) => {
        const mockReq1 = {
            query: {
                limit: "1",
            }
        }

        parseGetToDos(mockReq1, mockRes, () => {
            expect(mockRes.status.mock.calls.length).toBe(0)
            expect(mockReq1.query.limit).toBe(1)
            done()
        })
    })

    test("casts skip to int", (done) => {
        const mockReq2 = {
            query: {
                skip: "2"
            }
        }
    
        parseGetToDos(mockReq2, mockRes, () => {
            expect(mockRes.status.mock.calls.length).toBe(0)
            expect(mockReq2.query.skip).toBe(2)
            done()
        })
    })

    test("casts at to int", (done) => {
        const mockReq3 = {
            query: {
                at: "-3"
            }
        }
        parseGetToDos(mockReq3, mockRes, () => {
            expect(mockRes.status.mock.calls.length).toBe(0)
            expect(mockReq3.query.at).toBe(-3)
            done()
        })
    })

    test("accepts at=last", (done) => {
        const mockReq4 = {
            query: {
                at: "last"
            }
        }
        parseGetToDos(mockReq4, mockRes, () => {
            expect(mockRes.status.mock.calls.length).toBe(0)
            expect(mockReq4.query.at).toBe("last")
            done()
        })

    })


})