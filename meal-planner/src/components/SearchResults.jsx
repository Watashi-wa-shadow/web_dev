export function SearchResults({ recipe, notFound }) {
    if (!recipe && !notFound) return null; // nothing searched yet, show nothing here

    return (
        <div className="search-results">
            {notFound && <p className="not-found">Result not found</p>}

            {recipe && (
                <div className="recipe-card recipe-detail">
                    <h3>{recipe.name}</h3>
                    <p className="calories">{recipe.calories} kcal</p>

                    <div className="tags">
                        {recipe.tags?.map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>

                    <p className="ingredients">
                        <strong>Ingredients:</strong> {recipe.ingredients?.join(", ")}
                    </p>

                    <p className="instructions">
                        <strong>Instructions:</strong> {recipe.instructions || "No instructions provided."}
                    </p>
                </div>
            )}
        </div>
    );
}