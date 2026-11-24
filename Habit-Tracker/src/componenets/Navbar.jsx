import { useLocation } from 'react-router-dom';
import './Navbar.css';

export function Navbar({ habits, statusFilter, setStatusFilter }) {
  const location = useLocation();

  // Derive the current page title from the URL
  const path = location.pathname.replace('/', '');
  const pageTitle = path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';

  // Filter habits relevant to the current page for live counts
  const relevantHabits = path
    ? habits.filter((h) => h.categoryId.toLowerCase() === path.toLowerCase())
    : habits;

  const completedCount = relevantHabits.filter(
    (h) => h.status === 'Completed Today'
  ).length;

  const filters = ['All', 'Pending', 'In Progress', 'Completed Today'];

  return (
    <nav className='top-navbar'>
      <div className='navbar-left'>
        <h2 className='navbar-title'>{pageTitle}</h2>
        <span className='navbar-stats'>
          {completedCount} / {relevantHabits.length} Completed
        </span>
      </div>

      <div className='navbar-filters'>
        {filters.map((status) => (
          <button
            key={status}
            type='button'
            className={`filter-pill ${statusFilter === status ? 'active-pill' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </nav>
  );
}