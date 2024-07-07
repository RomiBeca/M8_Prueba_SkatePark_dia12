import { Router } from "express";
import {
  deleteSkater,
  getAdmin,
  getOneSkater,
  getSkater,
  loginSkater,
  profile,
  putAdmin,
  putSkater,
  registerSkater,
} from "../controllers/skaters.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";
const router = Router();

// Registro y login
router.post("/login", loginSkater);
router.post("/registro", registerSkater);

// Skaters CRUD
router.get("/skaters", getSkater);
router.get("/skaters/:email", getOneSkater);
router.put("/skaters/:email", putSkater);
router.delete("/skaters/:email", deleteSkater);

// Perfil Skaters
router.get("/profile", verifyToken, profile);

// Administrador
router.get("/admin", getAdmin);
router.put("/admin/:email", putAdmin);

export default router;
