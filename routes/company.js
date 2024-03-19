import express from "express";

import {
  register,
  getCompany,
  getCompanies,
  updateCompany,
} from "../controllers/companyController.js";

const router = express.Router();

// /v1/companies - get all companies
router.get("/", getCompanies);

// /v1/companies POST - to register a company
router.post("/", register);

// v1/companies/id GET
router.get("/:id", getCompany);

// /v1/companies/id PUT
router.patch("/:id", updateCompany);

export default router;

// const db = {
//   companies: [
//     {
//       id: 1,
//       companyName: "BeHance",
//       email: "be@gmail.com",
//       password: "htjtjtj",
//       description: "Описание",
//     },

//     {
//       id: 2,
//       companyName: "Яндекс",
//       email: "yandex@gmail.com",
//       password: "htjtjtjcssddsd",
//       description: "Описание",
//     },
//     {
//       id: 3,
//       companyName: "ololo",
//       email: "ololo@gmail.com",
//       password: "htjtjtjaresre",
//       description: "Описание",
//     },
//   ],
// };

// // /v1/companies GET
// companyRouter.get("/", async (req, res) => {
//   try {
//     res.status(200).send(db);
//   } catch (error) {
//     console.log(error);
//   }
// });

// // /v1/companies POST - to register a company
// companyRouter.post("/", async (req, res) => {
//   let createdCompany = {
//     id: +new Date(),
//     companyName: "bebe",
//     email: "chepik@gmail.com",
//     password: "123456",
//     description: "Описание",
//   };

//   db.companies.push(createdCompany);
//   res.status(201).send(createdCompany);
// });

// // v1/companies/id GET
// companyRouter.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   let company = db.companies.filter((item) => item.id === +id);
//   if (company.length !== 0) {
//     res.status(200).send(company);
//   } else {
//     res.status(404).send("Company not found");
//   }
// });

// // /v1/companies/id PUT
// companyRouter.put("/:id", async (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const id = req.params.id;
//   let company = db.companies.find((item) => item.id === +id);
//   let name = req.body.companyName;
//   let value = req.body.description;

//   if (company) {
//     company.companyName = name;
//     company.description = value;
//     res.status(200).send(company);
//   } else {
//     res.status(404).send("Company not found");
//   }
// });

// module.exports = companyRouter;
