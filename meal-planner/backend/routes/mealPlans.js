import { Router } from "express";
import { readDB, writeDB } from "../db.js";

const router = Router();

// GET /api/meal-plans -> list all meal plans
router.get("/", async (req, res) => {
    const db = await readDB();
    res.json(db.mealPlans);
});

// GET /api/meal-plans/:date -> get the plan for a specific date (YYYY-MM-DD)
router.get("/:date", async (req, res) => {
    const db = await readDB();
    const plan = db.mealPlans.find((p) => p.date === req.params.date);

    if (!plan) {
        return res.status(404).json({ error: "No meal plan for that date" });
    }
    res.json(plan);
});

// POST /api/meal-plans -> create or replace the plan for a date
router.post("/", async (req, res) => {
    const { date, breakfast, lunch, dinner } = req.body;

    if (!date) {
        return res.status(400).json({ error: "date is required (YYYY-MM-DD)" });
    }

    const db = await readDB();
    const existingIndex = db.mealPlans.findIndex((p) => p.date === date);

    const planEntry = {
        date,
        breakfast: breakfast || null,
        lunch: lunch || null,
        dinner: dinner || null
    };

    if (existingIndex === -1) {
        db.mealPlans.push(planEntry);
    } else {
        db.mealPlans[existingIndex] = planEntry;
    }

    await writeDB(db);
    res.status(201).json(planEntry);
});

// DELETE /api/meal-plans/:date -> remove a day's plan
router.delete("/:date", async (req, res) => {
    const db = await readDB();
    const exists = db.mealPlans.some((p) => p.date === req.params.date);

    if (!exists) {
        return res.status(404).json({ error: "No meal plan for that date" });
    }

    db.mealPlans = db.mealPlans.filter((p) => p.date !== req.params.date);
    await writeDB(db);

    res.status(204).send();
});

export default router;