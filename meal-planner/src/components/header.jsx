import './header.css'

export function Header() {
    return (
        <div className="header">
            <p className="recipe">🍳 Recipe Finder</p>
            <div className="search-wrapper">
                <input
                    className="input"
                    type="text"
                    placeholder="Search for a recipe..."
                />
                <button className="searchBtn">Search</button>
            </div>
        </div>
    );
}