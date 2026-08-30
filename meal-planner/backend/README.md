# Meal Planner Backend

A simple Node.js + Express backend for your Meal Planner / Recipe app.
Data is stored in a JSON file (`data/db.json`) — no database setup needed.
You can swap this for MongoDB/PostgreSQL later without changing your route logic much.

## Setup

```bash
npm install
npm start
```

Server runs at `http://localhost:5000`.

Use `npm run dev` instead to auto-restart on file changes.

## API Endpoints

### Recipes
| Method | Endpoint             | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | /api/recipes           | Get all recipes (supports `?search=name`) |
| GET    | /api/recipes/:id        | Get one recipe                     |
| POST   | /api/recipes            | Create a recipe                    |
| PUT    | /api/recipes/:id        | Update a recipe                    |
| DELETE | /api/recipes/:id        | Delete a recipe                    |

Example POST body:
```json
{
  "name": "Pancakes",
  "ingredients": ["2 eggs", "1 cup flour", "1 cup milk"],
  "instructions": "Mix and cook on a skillet.",
  "calories": 350,
  "tags": ["breakfast", "vegetarian"]
}
```

### Meal Plans
| Method | Endpoint                 | Description                          |
|--------|---------------------------|---------------------------------------|
| GET    | /api/meal-plans             | Get all meal plans                    |
| GET    | /api/meal-plans/:date        | Get plan for one date (YYYY-MM-DD)   |
| POST   | /api/meal-plans               | Create/replace a day's plan          |
| DELETE | /api/meal-plans/:date         | Delete a day's plan                  |

Example POST body:
```json
{
  "date": "2026-08-31",
  "breakfast": "recipe-id-here",
  "lunch": "recipe-id-here",
  "dinner": "recipe-id-here"
}
```

## Connecting from your React frontend

```javascript
const res = await fetch("http://localhost:5000/api/recipes?search=" + query);
const recipes = await res.json();
```

## Next steps you might want
- Add authentication (JWT) if users need accounts
- Move to a real database (MongoDB/SQLite/PostgreSQL) once data grows
- Add image upload support for recipes
