import jwt from "jsonwebtoken";
import Intern from "../models/internModel.js";
import Company from "../models/companyModel.js";
import { ERRORS } from "../constants/errors.js";

export function checkCompanyAuth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(ERRORS.NOT_AUTHORIZED.CODE).json({ message: ERRORS.NOT_AUTHORIZED.TITLE });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "company") {
            throw new Error();
        }
    }catch(error){
        return res.status(ERRORS.ACCESS_DENIED.CODE).json({ message: ERRORS.ACCESS_DENIED.TITLE });
    }

    next();
}

export function checkInternAuth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(ERRORS.NOT_AUTHORIZED.CODE).json({ message: ERRORS.NOT_AUTHORIZED.TITLE });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "intern") {
            throw new Error();
        }
    }catch(error){
        return res.status(ERRORS.ACCESS_DENIED.CODE).json({ message: ERRORS.ACCESS_DENIED.TITLE });
    }

    next();
}

export function checkAuth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(ERRORS.NOT_AUTHORIZED.CODE).json({ message: ERRORS.NOT_AUTHORIZED.TITLE });
    }

    try{ 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.sessionData = decoded;
    }catch(error){
        return res.status(ERRORS.NOT_AUTHORIZED.CODE).json({ message: ERRORS.NOT_AUTHORIZED.TITLE });
    }
     
    next();
}



export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const actualToken = authHeader.split(' ')[1];

    if (!actualToken) {
      //  add constant 
      return res.status(403).send('A token is required for authentication');
    }

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    const company = await Company.findOne({ _id: decoded.userId });
    const intern = await Intern.findOne({ _id: decoded.userId });

    if (company) {
        // Добавить обработку токена для компании
    const decodedAccessToken = jwt.verify(company.accessToken, process.env.JWT_SECRET);

      if (decoded == decodedAccessToken) {
        return next();
      }
      return res.status(403).send('bad');
    } else if(intern){
    const decodedAccessToken = jwt.verify(intern.accessToken, process.env.JWT_SECRET);

      if (JSON.stringify(decoded) === JSON.stringify(decodedAccessToken)) {
        return  next();
      }
      return res.status(403).send('bad');
    }
  
    } catch (err) {
      return res.status(400).send('Invalid Token');
    }
  };