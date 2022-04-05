import express from "express";
import { getFigure } from "../controllers/GetFigure.js";

const router = express.Router();

router.get("/:pin", getFigure);

export default router;
