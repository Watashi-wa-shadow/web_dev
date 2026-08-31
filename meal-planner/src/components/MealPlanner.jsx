import { useState } from 'react';
import './MealPlanner.css';

export function MealPlanner({ mealPlans = [], allRecipes = [], onSaveMealPlan }) {
  const [selectedDate, setSelectedDate] = useState("2026-08-31");
  const [modalSlot, setModalSlot] = useState(null); // "breakfast" | "lunch" | "dinner" | null
  const [modalSearch, setModalSearch] = useState("");

  // Find existing plan for selected date or fallback to empty template
  const currentPlan = mealPlans.find((p) => p.date === selectedDate) || {
    date: selectedDate,
    breakfast: null,
    lunch: null,
    dinner: null
  };

  const getRecipeById = (id) => allRecipes.find((r) => r.id === id);

  const breakfastRecipe = getRecipeById(currentPlan.breakfast);
  const lunchRecipe = getRecipeById(currentPlan.lunch);
  const dinnerRecipe = getRecipeById(currentPlan.dinner);

  const totalCalories =
    (breakfastRecipe?.calories || 0) +
    (lunchRecipe?.calories || 0) +
    (dinnerRecipe?.calories || 0);

  const handleSelectRecipe = (recipeId) => {
    const updatedPlan = {
      ...currentPlan,
      [modalSlot]: recipeId
    };
    onSaveMealPlan(updatedPlan);
    setModalSlot(null);
    setModalSearch("");
  };

  const handleRemoveMeal = (slot) => {
    const updatedPlan = {
      ...currentPlan,
      [slot]: null
    };
    onSaveMealPlan(updatedPlan);
  };

  const filteredModalRecipes = allRecipes.filter((r) =>
    r.name.toLowerCase().includes(modalSearch.toLowerCase())
  );

  return (
    <div className="meal-planner-container">
      {/* Header & Date Controls */}
      <div className="planner-header">
        <div>
          <h2>📅 Daily Meal Planner</h2>
          <p className="subtitle">Manage breakfast, lunch, and dinner for each day</p>
        </div>

        <div className="date-picker-box">
          <label htmlFor="plan-date">Select Date:</label>
          <input
            type="date"
            id="plan-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Daily Calories Summary */}
      <div className="daily-stats-card">
        <span>⚡ Total Planned Calories: <strong>{totalCalories} kcal</strong></span>
      </div>

      {/* Meals Grid: Breakfast, Lunch, Dinner */}
      <div className="meals-grid">
        {/* Breakfast */}
        <div className="meal-card">
          <div className="meal-card-header">
            <h3>🌅 Breakfast</h3>
            <button
              type="button"
              className="meal-action-btn"
              onClick={() => setModalSlot("breakfast")}
            >
              {breakfastRecipe ? "Change" : "+ Add Meal"}
            </button>
          </div>
          {breakfastRecipe ? (
            <div className="meal-details">
              <h4>{breakfastRecipe.name}</h4>
              <span className="cal-tag">{breakfastRecipe.calories} kcal</span>
              <p className="ingredients-preview">
                <strong>Ingredients:</strong> {breakfastRecipe.ingredients?.slice(0, 3).join(", ")}...
              </p>
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveMeal("breakfast")}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="empty-slot">No breakfast selected yet.</div>
          )}
        </div>

        {/* Lunch */}
        <div className="meal-card">
          <div className="meal-card-header">
            <h3>☀️ Lunch</h3>
            <button
              type="button"
              className="meal-action-btn"
              onClick={() => setModalSlot("lunch")}
            >
              {lunchRecipe ? "Change" : "+ Add Meal"}
            </button>
          </div>
          {lunchRecipe ? (
            <div className="meal-details">
              <h4>{lunchRecipe.name}</h4>
              <span className="cal-tag">{lunchRecipe.calories} kcal</span>
              <p className="ingredients-preview">
                <strong>Ingredients:</strong> {lunchRecipe.ingredients?.slice(0, 3).join(", ")}...
              </p>
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveMeal("lunch")}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="empty-slot">No lunch selected yet.</div>
          )}
        </div>

        {/* Dinner */}
        <div className="meal-card">
          <div className="meal-card-header">
            <h3>🌙 Dinner</h3>
            <button
              type="button"
              className="meal-action-btn"
              onClick={() => setModalSlot("dinner")}
            >
              {dinnerRecipe ? "Change" : "+ Add Meal"}
            </button>
          </div>
          {dinnerRecipe ? (
            <div className="meal-details">
              <h4>{dinnerRecipe.name}</h4>
              <span className="cal-tag">{dinnerRecipe.calories} kcal</span>
              <p className="ingredients-preview">
                <strong>Ingredients:</strong> {dinnerRecipe.ingredients?.slice(0, 3).join(", ")}...
              </p>
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveMeal("dinner")}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="empty-slot">No dinner selected yet.</div>
          )}
        </div>
      </div>

      {/* Modal for selecting a recipe */}
      {modalSlot && (
        <div className="modal-overlay" onClick={() => setModalSlot(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choose Recipe for {modalSlot.toUpperCase()}</h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setModalSlot(null)}
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Search recipes..."
              className="modal-search"
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              autoFocus
            />

            <div className="modal-recipes-list">
              {filteredModalRecipes.map((item) => (
                <div
                  key={item.id}
                  className="modal-recipe-item"
                  onClick={() => handleSelectRecipe(item.id)}
                >
                  <div>
                    <span className="modal-recipe-name">{item.name}</span>
                    <span className="modal-recipe-tags">
                      {item.tags?.slice(0, 3).join(" • ")}
                    </span>
                  </div>
                  <span className="modal-recipe-cals">{item.calories} kcal</span>
                </div>
              ))}
              {filteredModalRecipes.length === 0 && (
                <p className="no-recipes">No recipes found matching "{modalSearch}".</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}