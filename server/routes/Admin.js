import express from "express";
import { deleteAll, getAll } from "../controllers/Admin.js";

const router = express.Router();

router.delete("/deleteAll", deleteAll);
router.get("/getAll", getAll);

export default router;
