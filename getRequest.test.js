import request from "supertest"
import { app } from "./index.js";
import internModel from "./models/internModel.js";

const authUser = {
    email: "palashkindmitriy@gmail.com",
    password: "StrongPassword123"
}
const authHeader = {
    AuthorizationServer: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUyMmYzZjcwNDBiMmNjMGRlN2RkZTEiLCJyb2xlIjoiY29tcGFueSIsImlhdCI6MTcxNjY2MjEwOSwiZXhwIjoxNzI1MzAyMTA5fQ.Hxx05kWkryBQqeSw2WF_KVrHiOkIl6xLUzvwKCa0Dek",
    AuthorizationIntern: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUyMjdmOWYxMmEzZWFhODY4Y2RlNzUiLCJyb2xlIjoiaW50ZXJuIiwiaWF0IjoxNzE2NjY4NzE5LCJleHAiOjE3MjUzMDg3MTl9.p61DqGWM_85LpKoCWa2qH1ihRlXcePPZ0sW9XZDCehc"
}

// REQUESTS COMPANY
const correctCompanyId = "66522f3f7040b2cc0de7dde1"
const uncorrectCompanyId = "nettakoikompanii"

// REQUESTS INTERNSHIP
const correctInternId = "665227f9f12a3eaa868cde75"
const uncorrectInternId = "nettakovausera"

describe("Requets Company", () => {
    // TRUE
    it("Test to request company from collection", async () => {
        const respone = await request(app).get(`/v1/company/${correctCompanyId}`).set("Authorization", authHeader.AuthorizationServer).send()
        expect(respone.status).toBe(200)
    })

    // FALSE
    it("Test to request company from collection", async () => {
        const respone = await request(app).get(`/v1/company/${uncorrectCompanyId}`).set("Authorization", authHeader.AuthorizationServer).send()
        expect(respone.status).toBe(404)
    })
})

describe("Requets Intern", () => {
    // TRUE
    it("Test to request intern from collection", async () => {
        const respone = await request(app).get(`/v1/intern/${correctInternId}/one`).set("Authorization", authHeader.AuthorizationIntern).send()
        expect(respone.status).toBe(200)
    })

    // FALSE
    it("Test to request intern from collection", async () => {
        const respone = await request(app).get(`/v1/intern/${uncorrectInternId}/one`).set("Authorization", authHeader.AuthorizationIntern).send()
        expect(respone.status).toBe(404)
    })
})