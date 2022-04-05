import express from "express";
import { createPlots } from "../controllers/CreatePlots.js";
import { updatePlot } from "../controllers/UpdatePlot.js";

const router = express.Router();

router.post("/create/:pin", createPlots);
router.post("/update/", updatePlot);

export default router;
