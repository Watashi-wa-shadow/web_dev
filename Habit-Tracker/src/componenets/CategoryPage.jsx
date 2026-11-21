import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import './page.css';
export function CategoryPage({ categories, setCategories, habits, setHabits }) {
  const { categoryName } = useParams();
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [priority, setPriority] = useState('Medium');

  const currentCategory = categories.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  );

  // Redirect to Dashboard if this section does not exist in categories
  if (!currentCategory) {
    return <Navigate to="/" replace />;
  }

  const filteredHabits = habits.filter(
    (c) => c.categoryId.toLowerCase() === currentCategory.name.toLowerCase()
  );

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!title.trim() || !target.trim()) return;

    const categoryExists = categories.some(
      (c) => c.name.toLowerCase() === currentCategory.name.toLowerCase()
    );
    if (!categoryExists) return;

    setHabits([
      ...habits,
      {
        id: crypto.randomUUID(),
        categoryId: currentCategory.name,
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
  return (
    <>
      <div className='other-part'>
        <form onSubmit={handleAddHabit}     className='add-habit-form'>
        <input
            type="text"
            className='habit-input habit-input-readonly'
            value={currentCategory.name}
            readOnly
            size={currentCategory.name.length + 2}
        />
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

        <div className='Habit-details'>
            {filteredHabits.map((c) => (
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