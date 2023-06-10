import express from "express";
export const chatRouter = express.Router();

chatRouter.get("/", (_, res) => {
    return res.status(201).render('chat', {});
});