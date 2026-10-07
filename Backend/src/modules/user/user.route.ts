import { Router } from "express";
import { getUsers } from "./user.controller.js";

const router = Router();
// all users get
router.get("/", getUsers);

export default router;
