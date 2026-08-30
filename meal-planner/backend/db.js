import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "data", "db.json");

// Default shape of the database if the file doesn't exist yet
const DEFAULT_DATA = {
    recipes: [],
    mealPlans: []
};

async function readDB() {
    try {
        const raw = await readFile(DB_PATH, "utf-8");
        return JSON.parse(raw);
    } catch (err) {
        if (err.code === "ENOENT") {
            await writeDB(DEFAULT_DATA);
            return structuredClone(DEFAULT_DATA);
        }
        throw err;
    }
}

async function writeDB(data) {
    await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export { readDB, writeDB };
