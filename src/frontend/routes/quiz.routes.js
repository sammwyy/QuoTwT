import { Router } from "express";

const router = Router();

router.get("/create", (req, res) => {
  res.render("create.ejs");
});

router.get("/quiz/:id", (req, res) => {
  res.render("quiz.ejs");
});

export default router;
