import express from "express";
import { sendContactMessage } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/send", sendContactMessage);

export default router;