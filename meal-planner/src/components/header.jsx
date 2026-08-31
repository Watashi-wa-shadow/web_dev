import { useState, useRef, useEffect } from 'react';
import './header.css';

export function Header({ 
  input, 
  setInput, 
  onSearch, 
  suggestions = [], 
  onSelectSuggestion, 
  onNavigate, 
  currentPage 
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputContainerRef = useRef(null);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setInput("");
    setShowSuggestions(false);
    if (onNavigate) onNavigate("home");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch();
  };

  const handleNavClick = (page) => {
    if (onNavigate) onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-content">
          {/* Left section: Hamburger Icon + Logo */}
          <div className="nav-left">
            <button 
              type="button"
              className="hamburger-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <div className="brand-logo" onClick={handleClear}>
              <span className="logo-icon">🍳</span>
              <span className="logo-text">Recipe Finder</span>
            </div>
          </div>

          {/* Search section */}
          <form className="search-box-wrapper" onSubmit={handleFormSubmit}>
            <div className="search-input-field" ref={inputContainerRef}>
              <input
                type="text"
                placeholder="Search for a recipe..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowSuggestions(false);
                    onSearch();
                  }
                }}
              />

              {input && (
                <button
                  type="button"
                  className="clear-icon-btn"
                  onClick={handleClear}
                  aria-label="Clear input"
                >
                  ✕
                </button>
              )}

              {/* Suggestions Dropdown positioned strictly under input */}
              {showSuggestions && input.trim().length > 0 && suggestions.length > 0 && (
                <ul className="dropdown-suggestions">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="dropdown-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onSelectSuggestion(item);
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="item-name">{item.name}</span>
                      <span className="item-calories">{item.calories} kcal</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      {isMenuOpen && (
        <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="drawer-menu" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Menu</h3>
              <button 
                type="button" 
                className="close-drawer-btn" 
                onClick={() => setIsMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="drawer-nav">
              <button 
                type="button"
                className={`drawer-link ${currentPage === "home" ? "active" : ""}`}
                onClick={() => handleNavClick("home")}
              >
                🏠 Home / All Recipes
              </button>
              <button 
                type="button"
                className={`drawer-link ${currentPage === "meal-plan" ? "active" : ""}`}
                onClick={() => handleNavClick("meal-plan")}
              >
                📅 Meal Planner
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}