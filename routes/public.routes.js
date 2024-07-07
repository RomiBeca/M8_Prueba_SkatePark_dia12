import { Router } from "express";
import path from "path";
const router = Router();

const __dirname = import.meta.dirname;
const publicPath = path.join(__dirname, "../public");

router.get("/register", (req, res) => {
  res.sendFile(publicPath + "/register.html");
});
router.get("/login", (req, res) => {
  res.sendFile(publicPath + "login.html");
});

router.get("/admin", (req, res) => {
  res.sendFile(publicPath + "/admin.html");
});

router.get("/perfil", (req, res) => {
  res.sendFile(publicPath + "/perfil.html");
});

export default router;