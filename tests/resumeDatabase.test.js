import request from "supertest";
import { app } from "../index.js";

const authUser = {
  email: "chepurnaia@gmail.com",
  password: "Password123",
};

const authHeader = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUzNGQ5ZmQxNjE5ZThkMWRkNTI4ZWIiLCJyb2xlIjoiaW50ZXJuIiwiaWF0IjoxNzE2NzM1ODg3LCJleHAiOjE3MjUzNzU4ODd9.MSailTKdgwhoX_txdKFU44uf50AfFHAwYR4_J75QuPE",
};
let id = "66534d9fd1619e8d1dd528eb";

// TRUE INTERNSHIPS
const correctResume = {
  age: 22,
  location: "Таганрог",
  levelOfEducation: "Backend developer",
  educationalInstitution: "Бакалавр",
  specialization: "C++, Linux",
  hardSkills: "C++",
  softSkills: "-",
};

// FALSE INTERNSHIPS
const falseAgeResume = {
  age: 14,
  location: "Таганрог",
  levelOfEducation: "Backend developer",
  educationalInstitution: "Бакалавр",
  specialization: "C++, Linux",
  hardSkills: "C++",
  softSkills: "-",
};

const falseLocationResume = {
  age: 22,
  location: "",
  levelOfEducation: "Backend developer",
  educationalInstitution: "Бакалавр",
  specialization: "C++, Linux",
  hardSkills: "C++",
  softSkills: "-",
};

const falseLevelResume = {
  age: 22,
  location: "Таганрог",
  levelOfEducation: "",
  educationalInstitution: "Бакалавр",
  specialization: "C++, Linux",
  hardSkills: "C++",
  softSkills: "-",
};

const falseInstitutionResume = {
  age: 22,
  location: "Таганрог",
  levelOfEducation: "Backend developer",
  educationalInstitution: "",
  specialization: "C++, Linux",
  hardSkills: "C++",
  softSkills: "-",
};

const falseSpecializationResume = {
  age: 22,
  location: "Таганрог",
  levelOfEducation: "Backend developer",
  educationalInstitution: "Бакалавр",
  specialization: "",
  hardSkills: "C++",
  softSkills: "-",
};

const falseHardResume = {
  age: 22,
  location: "Таганрог",
  levelOfEducation: "Backend developer",
  educationalInstitution: "Бакалавр",
  specialization: "C++, Linux",
  hardSkills: "",
  softSkills: "-",
};

const falseSoftResume = {
  age: 22,
  location: "Таганрог",
  levelOfEducation: "Backend developer",
  educationalInstitution: "Бакалавр",
  specialization: "C++, Linux",
  hardSkills: "C++",
  softSkills: "",
};

describe("Test cases to add correct resume in collection", () => {
  // TRUE
  it("Test to add correctResume internship in collection", async () => {
    // const log = await request(app).post(`/v1/auth/login`).send(authUser)
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(correctResume);
    expect(respone.status).toBe(200);
  });
});

describe("Test cases to add uncorrect internships in collection", () => {
  // FALSE
  it("Test to add falseAgeResume resume in collection", async () => {
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(falseAgeResume);
    expect(respone.status).toBe(400);
  });

  it("Test to add falseLocationResume resume in collection", async () => {
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(falseLocationResume);
    expect(respone.status).toBe(400);
  });

  it("Test to add falseInstitutionResume resume in collection", async () => {
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(falseInstitutionResume);
    expect(respone.status).toBe(400);
  });

  it("Test to add falseSpecializationResume resume in collection", async () => {
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(falseSpecializationResume);
    expect(respone.status).toBe(400);
  });

  it("Test to add falseHardResume resume in collection", async () => {
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(falseHardResume);
    expect(respone.status).toBe(400);
  });

  it("Test to add falseSoftResume resume in collection", async () => {
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(falseSoftResume);
    expect(respone.status).toBe(400);
  });

  it("Test to add falseLevelResume resume in collection", async () => {
    const respone = await request(app)
      .put(`/v1/intern/${id}/resume`)
      .set("Authorization", authHeader.Authorization)
      .send(falseLevelResume);
    expect(respone.status).toBe(400);
  });
});
