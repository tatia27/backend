import request from "supertest"
import { app } from "./index.js";

const authHeader = {
    AuthorizationServer: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUyMmYzZjcwNDBiMmNjMGRlN2RkZTEiLCJyb2xlIjoiY29tcGFueSIsImlhdCI6MTcxNjY2MjEwOSwiZXhwIjoxNzI1MzAyMTA5fQ.Hxx05kWkryBQqeSw2WF_KVrHiOkIl6xLUzvwKCa0Dek"
}
let id = "66522f3f7040b2cc0de7dde1";

// TRUE COMPANIES
const correctCompany = {
    name: "test",
    email: "test@gmail.com",
    password: "12345678",
    conditions: true,
    role: "company"
}

// FALSE COMPANIES 
const emptyNameCompany = {
    name: "",
    email: "test@gmail.com",
    password: "12345678",
    conditions: true,
    role: "company"
}

const lessEightPasswordCompany = {
    name: "test",
    email: "test@gmail.com",
    password: "",
    conditions: true,
    role: "company"
}

const emptyEmailCompany = {
    name: "test",
    email: "",
    password: "12345678",
    conditions: true,
    role: "company"
}

const conditionFalseCompany = {
    name: "test",
    email: "test@gmail.com",
    password: "12345678",
    conditions: false,
    role: "company"
}

const correctCompanyCopy = {
    name: "test",
    email: "test@gmail.com",
    password: "12345678",
    conditions: true,
    role: "company"
}

describe("Test cases to add correct companies in collection", () => {
    // TRUE
    it("Test to add correctCompany company in collection", async () => {
        const respone = await request(app).post("/v1/company").send(correctCompany)
        expect(respone.status).toBe(200)
    })

    // Будет выполняться только если компания авторизована и правильный id
    it("Test to update company info in collection", async () => {
        const respone = await request(app).patch(`/v1/company/${id}`).set("Authorization", authHeader.AuthorizationServer).send(
            {
                name: "Tatiana",
                description: "Lyubimka <3"
            }
        )
        expect(respone.status).toBe(200)
    })
})

describe("Test cases to add uncorrect companies in collection", () => {
    // FALSE
    it("Test to add emptyNameCompany company in collection", async () => {
        const respone = await request(app).post("/v1/company").send(emptyNameCompany)
        expect(respone.status).toBe(400)
    })

    it("Test to add lessEightPasswordCompany company in collection", async () => {
        const respone = await request(app).post("/v1/company").send(lessEightPasswordCompany)
        expect(respone.status).toBe(400)
    })

    it("Test to add emptyEmailCompany company in collection", async () => {
        const respone = await request(app).post("/v1/company").send(emptyEmailCompany)
        expect(respone.status).toBe(400)
    })

    it("Test to add conditionFalseCompany company in collection", async () => {
        const respone = await request(app).post("/v1/company").send(conditionFalseCompany)
        expect(respone.status).toBe(400)
    })

    it("Test to add correctCompanyCopy company in collection", async () => {
        const respone = await request(app).post("/v1/company").send(correctCompanyCopy)
        expect(respone.status).toBe(400)
    })
})