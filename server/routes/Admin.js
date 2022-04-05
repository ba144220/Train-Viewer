import express from "express";
import { deleteAll, getAll } from "../controllers/Admin.js";
import adminAuth from "../middleware/Admin.js";

const router = express.Router();

router.delete("/deleteAll", adminAuth, deleteAll);
router.get("/getAll", adminAuth, getAll);

export default router;
