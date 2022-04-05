import express from "express";
import { getPin } from "../controllers/GetPin.js";

const router = express.Router();

router.get("/", getPin);

export default router;
