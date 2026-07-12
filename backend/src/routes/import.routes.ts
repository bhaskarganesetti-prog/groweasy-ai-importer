import { Router } from "express";
import { importCsv } from "../controllers/import.controller";

const router = Router();

router.post("/", importCsv);

export default router;