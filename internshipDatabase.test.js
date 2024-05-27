import request from "supertest"
import { app } from "./index.js";

const authUser = {
    email: "test@gmail.com",
    password: "12345678"
}

const authHeader = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUzNDY4ZTZhMDkxMTBhZTA4OWRkMDciLCJyb2xlIjoiY29tcGFueSIsImlhdCI6MTcxNjczNjEwMiwiZXhwIjoxNzI1Mzc2MTAyfQ.CRAHpQwjxnZVY72jqb1LxmuyVLXoGpoBoRIm4uqK94o"
}
let id = "6653468e6a09110ae089dd07";

// TRUE INTERNSHIPS
const correctInsternship = {
    title: "Company",
    company: "Company",
    focusOfInternship: "Backend developer",
    schedule: "Office",
    typeOfEmployment: "Partial",
    durationOfInternship: "Company",
    salary: 12422,
    skills: "Company",
    conditions: "Company",
}

// FALSE INTERNSHIPS
const falseTitleInsternship = {
    title: "",
    company: "Company",
    focusOfInternship: "Backend developer",
    schedule: "Office",
    typeOfEmployment: "Partial",
    durationOfInternship: "Company",
    salary: 12422,
    skills: "Company",
    conditions: "Company",
}

const falseCompanyInsternship = {
    title: "Title",
    company: "",
    focusOfInternship: "Backend developer",
    schedule: "Office",
    typeOfEmployment: "Partial",
    durationOfInternship: "Company",
    salary: 12422,
    skills: "Company",
    conditions: "Company",
}

const falseDurationInsternship = {
    title: "Title",
    company: "Company",
    focusOfInternship: "Backend developer",
    schedule: "Office",
    typeOfEmployment: "Partial",
    durationOfInternship: "",
    salary: 12422,
    skills: "Company",
    conditions: "Company",
}

const falseSalaryInsternship = {
    title: "Company",
    company: "Company",
    focusOfInternship: "Backend developer",
    schedule: "Office",
    typeOfEmployment: "Partial",
    durationOfInternship: "Company",
    salary: -2042,
    skills: "Company",
    conditions: "Company",
}

const falseSkillsInsternship = {
    title: "Company",
    company: "Company",
    focusOfInternship: "Backend developer",
    schedule: "Office",
    typeOfEmployment: "Partial",
    durationOfInternship: "Company",
    salary: 12422,
    skills: "",
    conditions: "Company",
}

const falseConditionsInsternship = {
    title: "Company",
    company: "Company",
    focusOfInternship: "Backend developer",
    schedule: "Office",
    typeOfEmployment: "Partial",
    durationOfInternship: "Company",
    salary: 12422,
    skills: "Company",
    conditions: "",
}

describe("Test cases to add correct internships in collection", () => {
    // TRUE
    it("Test to add correctInsternship internship in collection", async () => {
         const log = await request(app).post(`/v1/auth/login`).send(authUser);
        const respone = await request(app).post(`/v1/internships/${id}`).set("Authorization", authHeader.Authorization).send(correctInsternship)
        expect(respone.status).toBe(200)
    })
})

describe("Test cases to add uncorrect internships in collection", () => {
    // false
    it("Test to add falseTitleInsternship internship in collection", async () => {
        const respone = await request(app).post(`/v1/internships/${id}`).set("Authorization", authHeader.Authorization).send(falseTitleInsternship)
        expect(respone.status).toBe(400)
    })

    it("Test to add falseCompanyInsternship internship in collection", async () => {
        const respone = await request(app).post(`/v1/internships/${id}`).set("Authorization", authHeader.Authorization).send(falseCompanyInsternship)
        expect(respone.status).toBe(400)
    })

    it("Test to add falseDurationInsternship internship in collection", async () => {
        const respone = await request(app).post(`/v1/internships/${id}`).set("Authorization", authHeader.Authorization).send(falseDurationInsternship)
        expect(respone.status).toBe(400)
    })

    it("Test to add falseSalaryInsternship internship in collection", async () => {
        const respone = await request(app).post(`/v1/internships/${id}`).set("Authorization", authHeader.Authorization).send(falseSalaryInsternship)
        expect(respone.status).toBe(400)
    })

    it("Test to add falseSkillsInsternship internship in collection", async () => {
        const respone = await request(app).post(`/v1/internships/${id}`).set("Authorization", authHeader.Authorization).send(falseSkillsInsternship)
        expect(respone.status).toBe(400)
    })

    it("Test to add falseConditionsInsternship internship in collection", async () => {
        const respone = await request(app).post(`/v1/internships/${id}`).set("Authorization", authHeader.Authorization).send(falseConditionsInsternship)
        expect(respone.status).toBe(400)
    })
})
