import { Response } from "express";

export const handleError = (error: any, res: Response) => {
    let message = "Unnown error";
    let status = 500;
    if (error instanceof Error) {
        message = error.message;
    }
    res.status(status).send(message);
}
