import express from "express";
import path from "path";

import indexRoutes from "./frontend/routes/index.routes";
import quizRoutes from "./frontend/routes/quiz.routes";

const app = express();

/* Settings */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "views"));

/* Middleware */
app.use(express.static(path.join(__dirname, "..", "public")));

/* Routes */
app.use("/", indexRoutes);
app.use("/", quizRoutes);

export default app;
