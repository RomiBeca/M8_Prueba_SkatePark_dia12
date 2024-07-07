import "dotenv/config";
import express from "express";
import routerSkater from "./routes/skaters.routes.js";
import routerViews from "./routes/public.routes.js";

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ruta publica
app.use(express.static("public"));
// Rutas
app.use("/", routerViews);
app.use("/api/v1", routerSkater);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
