import { useState, useEffect } from 'react';
import './body.css';

export function Body() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/recipes");

                if (!res.ok) {
                    throw new Error(`Server responded with ${res.status}`);
                }

                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Failed to fetch recipes:", err);
                setError("Failed to load recipes. Is the backend running?");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []); // empty array = runs once when component mounts

    if (loading) return <p className="status">Loading recipes...</p>;
    if (error) return <p className="status error">{error}</p>;

    return (
        <div className="body">
            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <h3>{recipe.name}</h3>
                        <p className="calories">{recipe.calories} kcal</p>
                        <div className="tags">
                            {recipe.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <p className="ingredients">
                            {recipe.ingredients.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}