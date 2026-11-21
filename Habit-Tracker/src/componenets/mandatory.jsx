import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './mandatory.css';

export function Mandatory({ categories, setCategories, habits, setHabits }) {
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();
    if (!trimmed) return;

    const alreadyExists = categories.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return;

    setCategories([
      ...categories,
      {
        id: crypto.randomUUID(),
        name: trimmed,
      },
    ]);
    setNewCategory('');
  };

  const handleRemoveCategory = (e, categoryToRemove) => {
    e.preventDefault();
    e.stopPropagation();

    setCategories(categories.filter((c) => c.id !== categoryToRemove.id));
    setHabits(
      habits.filter(
        (h) => h.categoryId.toLowerCase() !== categoryToRemove.name.toLowerCase()
      )
    );

    if (location.pathname.toLowerCase() === `/${categoryToRemove.name.toLowerCase()}`) {
      navigate('/');
    }
  };

  return (
    <div className='Mandatory'>
      <div>
        <h1 className='header'>Habit Tracker</h1>
      </div>

      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='dash'>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M9 21v-6h6v6" />
          </svg> Dashboard
        </div>
      </Link>

      <div className='access'>
        <h3 className='header3'>Quick access to</h3>

        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/${c.name.toLowerCase()}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className='common'>
              <span>{c.name}</span>
              <button
                type="button"
                className='remove-btn'
                onClick={(e) => handleRemoveCategory(e, c)}
                title={`Remove ${c.name}`}
              >
                ×
              </button>
            </div>
          </Link>
        ))}

        <form className='add-category-form' onSubmit={handleAddCategory}>
          <input
            type="text"
            className='category-input'
            placeholder="New section..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit" className='add-btn'>+</button>
        </form>
      </div>
    </div>
  );
}