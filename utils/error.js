import { ERRORS } from "../constants/errors.js";

export function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(ERRORS.SERVER_ERROR.CODE).json({ message: ERRORS.SERVER_ERROR.TITLE });
}