import express from "express";
import cors from "cors";
import recipesRouter from "./routes/recipes.js";
import mealPlansRouter from "./routes/mealPlans.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
    res.json({ status: "Meal Planner backend is running" });
});

app.use("/api/recipes", recipesRouter);
app.use("/api/meal-plans", mealPlansRouter);

// Fallback 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
