import request from "supertest"
import { app } from "./index.js";

// TRUE INTERNS
const correctItern = {
    firstName: "Татьяна",
    middleName: "Владимировна",
    lastName: "Чепурная",
    email: "chepurnaia@gmail.com",
    password: "Password123",
    conditions: true,
    role: "intern"
}

// FALSE INTERNS
const emptyFirstNameIntern = {
    firstName: "",
    middleName: "Владимировна",
    lastName: "Чепурная",
    email: "chepurnaia@gmail.com",
    password: "StrongPassword123",
    conditions: true,
    role: "intern"
}

const emptyMiddleNameIntern = {
    firstName: "Татьяна",
    middleName: "",
    lastName: "Чепурная",
    email: "chepurnaia@gmail.com",
    password: "StrongPassword123",
    conditions: true,
    role: "intern"
}

const emptyLastNameIntern = {
    firstName: "Татьяна",
    middleName: "Владимировна",
    lastName: "",
    email: "chepurnaia@gmail.com",
    password: "StrongPassword123",
    conditions: true,
    role: "intern"
}

const emptyEmailItern = {
    firstName: "Татьяна",
    middleName: "Владимировна",
    lastName: "Чепурная",
    email: "",
    password: "StrongPassword123",
    conditions: true,
    role: "intern"
}

const lessEightPasswordItern = {
    firstName: "Татьяна",
    middleName: "Владимировна",
    lastName: "Чепурная",
    email: "chepurnaia@gmail.com",
    password: "Pass",
    conditions: true,
    role: "intern"
}

const conditionFalseItern = {
    firstName: "Татьяна",
    middleName: "Владимировна",
    lastName: "Чепурная",
    email: "chepurnaia@gmail.com",
    password: "Password123",
    conditions: false,
    role: "intern"
}

const correctIternCopy = {
    firstName: "Татьяна",
    middleName: "Владимировна",
    lastName: "Чепурная",
    email: "chepurnaia@gmail.com",
    password: "Password123",
    conditions: true,
    role: "intern"
}

describe("Test cases to add correct interns in collection", () => {
    // TRUE
    it("Test to add correctItern company in collection", async () => {
        // const log = await request(app).post(`/v1/auth/login`).send()
        const respone = await request(app).post("/v1/intern").send(correctItern)
        expect(respone.status).toBe(200)
    })
})

describe("Test cases to add uncorrect interns in collection", () => {
    // FALSE
    it("Test to add emptyFirstNameIntern company in collection", async () => {
        const respone = await request(app).post("/v1/intern").send(emptyFirstNameIntern)
        expect(respone.status).toBe(400)
    })

    it("Test to add emptyMiddleNameIntern company in collection", async () => {
        const respone = await request(app).post("/v1/intern").send(emptyMiddleNameIntern)
        expect(respone.status).toBe(400)
    })

    it("Test to add emptyLastNameIntern company in collection", async () => {
        const respone = await request(app).post("/v1/intern").send(emptyLastNameIntern)
        expect(respone.status).toBe(400)
    })

    it("Test to add emptyEmailItern company in collection", async () => {
        const respone = await request(app).post("/v1/intern").send(emptyEmailItern)
        expect(respone.status).toBe(400)
    })

    it("Test to add lessEightPasswordItern company in collection", async () => {
        const respone = await request(app).post("/v1/intern").send(lessEightPasswordItern)
        expect(respone.status).toBe(409)
    })

    it("Test to add conditionFalseItern company in collection", async () => {
        const respone = await request(app).post("/v1/intern").send(conditionFalseItern)
        expect(respone.status).toBe(400)
    })

    it("Test to add correctIternCopy company in collection", async () => {
        const respone = await request(app).post("/v1/intern").send(correctIternCopy)
        expect(respone.status).toBe(409)
    })
})
