import express from "express";
import { registerOrganization } from "../controllers/orgController.js";

const router = express.Router();

router.post("/register", registerOrganization);

export default router;
