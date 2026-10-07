import { Router } from "express";
import {
  addPerfumes,
  deletePerfume,
  getPerfumeById,
  getPerfumes,
} from "./perfume.controller.js";

const router = Router();

// add perfume
router.post("/", addPerfumes);

// get all perfumes
router.get("/", getPerfumes);

// get perfume by id
router.get("/:id", getPerfumeById);

// delete perfume by id
router.delete("/:id", deletePerfume);

export default router;
