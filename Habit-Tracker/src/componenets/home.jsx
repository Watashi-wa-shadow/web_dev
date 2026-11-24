import { useState } from 'react';
import './home.css';

export function Home({ categories, setCategories, habits, setHabits,statusFilter }) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories.length > 0 ? categories[0].name : ''
  );
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Keep selectedCategory valid if the currently selected category was deleted
  const activeCategoryName = categories.some((c) => c.name === selectedCategory)
    ? selectedCategory
    : categories[0]?.name || '';

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!title.trim() || !target.trim() || !activeCategoryName) return;

    // Double-check that the chosen category still exists
    const categoryExists = categories.some(
      (c) => c.name.toLowerCase() === activeCategoryName.toLowerCase()
    );
    if (!categoryExists) return;

    setHabits([
      ...habits,
      {
        id: crypto.randomUUID(),
        categoryId: activeCategoryName,
        title: title.trim(),
        target: target.trim(),
        priority,
        status: 'Pending',
      },
    ]);

    setTitle('');
    setTarget('');
    setPriority('Medium');
  };
  const handleStatusChange = (habitId, newStatus) => {
    setHabits(
        habits.map((h) => (h.id === habitId ? { ...h, status: newStatus } : h))
    );
    };
  const visibleHabits = habits.filter(
    (h) => statusFilter === 'All' || h.status === statusFilter
  );
  return (
    <>
      <div className='other-part'>
        {categories.length > 0 && (
          <form onSubmit={handleAddHabit} className='add-habit-form'>
            <select
                className='habit-select'
                value={activeCategoryName}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categories.map((c) => (
                <option key={c.id} value={c.name}>
                    {c.name}
                </option>
                ))}
            </select>
            <input
                type="text"
                className='habit-input'
                placeholder="Habit title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                className='habit-input'
                placeholder="Target (e.g. 30 mins)..."
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <select
                className='habit-select'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button type="submit" className='habit-submit-btn'>Add Habit</button>
        </form>
        )}

        <div className='Habit-details'>
            {habits.map((c) => (
                <div key={c.id} className='habits'>
                <div className='habit-top'>
                    <span className='habit-category'>{c.categoryId}</span>
                    <span className={`habit-priority priority-${c.priority.toLowerCase()}`}>
                    {c.priority}
                    </span>
                </div>

                <h3 className='habit-title'>{c.title}</h3>
                <p className='habits-P'>Target: {c.target}</p>

                <div className='habit-status-row'>
                    <label className='habits-P'>Status:</label>
                    <select
                    className='status-select'
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed Today">Completed Today</option>
                    </select>
                </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
}