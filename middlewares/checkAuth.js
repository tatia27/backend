import jwt from "jsonwebtoken";
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


