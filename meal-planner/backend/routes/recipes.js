import { Router } from "express";
import { readDB, writeDB } from "../db.js";

const router = Router();

// GET /api/recipes  -> list all recipes (supports ?search=name)
router.get("/", async (req, res) => {
    const db = await readDB();
    const { search } = req.query;

    let recipes = db.recipes;
    if (search) {
        const term = search.toLowerCase();
        recipes = recipes.filter((r) => r.name.toLowerCase().includes(term));
    }

    res.json(recipes);
});

// GET /api/recipes/:id -> get a single recipe
router.get("/", async (req, res) => {
    const db = await readDB();
    const { search } = req.query;

    if (search) {
        const term = search.toLowerCase();
        const recipe = db.recipes.find((r) => r.name.toLowerCase().includes(term));

        return res.json({
            exists: !!recipe,
            recipe: recipe || null
        });
    }

    // no search param -> just return everything
    res.json(db.recipes);
});

// POST /api/recipes -> create a new recipe
router.post("/", async (req, res) => {
    const { name, ingredients, instructions, calories, tags } = req.body;

    if (!name || !ingredients) {
        return res.status(400).json({ error: "name and ingredients are required" });
    }

    const db = await readDB();
    const newRecipe = {
        id: crypto.randomUUID(),
        name,
        ingredients,
        instructions: instructions || "",
        calories: calories || null,
        tags: tags || [],
        createdAt: new Date().toISOString()
    };

    db.recipes.push(newRecipe);
    await writeDB(db);

    res.status(201).json(newRecipe);
});

// PUT /api/recipes/:id -> update an existing recipe
router.put("/:id", async (req, res) => {
    const db = await readDB();
    const index = db.recipes.findIndex((r) => r.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    db.recipes[index] = {
        ...db.recipes[index],
        ...req.body,
        id: db.recipes[index].id
    };

    await writeDB(db);
    res.json(db.recipes[index]);
});

// DELETE /api/recipes/:id -> delete a recipe
router.delete("/:id", async (req, res) => {
    const db = await readDB();
    const exists = db.recipes.some((r) => r.id === req.params.id);

    if (!exists) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    db.recipes = db.recipes.filter((r) => r.id !== req.params.id);
    await writeDB(db);

    res.status(204).send();
});

export default router;