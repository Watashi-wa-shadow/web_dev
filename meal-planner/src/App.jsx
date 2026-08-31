import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { Header } from './components/header'
import { Body } from './components/body'
import { SearchResults } from './components/SearchResults'
import { MealPlanner } from './components/MealPlanner'

export function App() {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [allRecipes, setAllRecipes] = useState([])
  const [page, setPage] = useState("home") // "home" | "results" | "meal-plan"
  const [recipe, setRecipe] = useState(null)
  const [notFound, setNotFound] = useState(false)

  // Meal plans state with initial default plan
  const [mealPlans, setMealPlans] = useState([
    {
      date: "2026-08-31",
      breakfast: "1a2b3c4d-0001-4000-8000-000000000001",
      lunch: "1a2b3c4d-0002-4000-8000-000000000002",
      dinner: "1a2b3c4d-0003-4000-8000-000000000003"
    }
  ])

  // 1. Fetch all recipes on initial load (for suggestions & meal planner modal)
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes")
        setAllRecipes(response.data)
      } catch (error) {
        console.error("Error loading recipes:", error)
      }
    }
    fetchRecipes()
  }, [])

  // 2. Autocomplete live suggestions with debounce
  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([])
      if (page === "results") {
        setPage("home")
      }
      setRecipe(null)
      setNotFound(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes", {
          params: { search: input.trim() }
        })
        setSuggestions(response.data.slice(0, 6))
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      }
    }, 250)

    return () => clearTimeout(timer)
  }, [input])

  // 3. Search button / Enter key handler
  const handleSearch = async () => {
    if (!input.trim()) {
      setPage("home")
      return
    }

    try {
      const response = await axios.get("http://localhost:5000/api/recipes", {
        params: { search: input.trim() }
      })
      const recipes = response.data

      if (recipes.length > 0) {
        setRecipe(recipes[0])
        setNotFound(false)
      } else {
        setRecipe(null)
        setNotFound(true)
      }
      setPage("results")
    } catch (error) {
      console.error("Search error:", error)
      setRecipe(null)
      setNotFound(true)
      setPage("results")
    }
  }

  // 4. Click handler for autocomplete suggestions dropdown
  const handleSelectSuggestion = (selectedRecipe) => {
    setInput(selectedRecipe.name)
    setRecipe(selectedRecipe)
    setNotFound(false)
    setPage("results")
  }

  // 5. Update or add meal plans
  const handleSaveMealPlan = (updatedPlan) => {
    setMealPlans((prev) => {
      const exists = prev.some((p) => p.date === updatedPlan.date)
      if (exists) {
        return prev.map((p) => (p.date === updatedPlan.date ? updatedPlan : p))
      }
      return [...prev, updatedPlan]
    })
  }

  return (
    <>
      <Header
        input={input}
        setInput={setInput}
        onSearch={handleSearch}
        suggestions={suggestions}
        onSelectSuggestion={handleSelectSuggestion}
        onNavigate={(targetPage) => setPage(targetPage)}
        currentPage={page}
      />

      {page === "home" && <Body />}
      {page === "results" && <SearchResults recipe={recipe} notFound={notFound} />}
      {page === "meal-plan" && (
        <MealPlanner
          mealPlans={mealPlans}
          allRecipes={allRecipes}
          onSaveMealPlan={handleSaveMealPlan}
        />
      )}
    </>
  )
}

export default App