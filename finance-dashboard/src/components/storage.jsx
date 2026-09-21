import { useSyncExternalStore, useMemo } from 'react'

export const defaultSummary = { balance: 100000, income: 50000, expenses: 20000 };

const listeners = new Set();

function subscribe(cb) {
  listeners.add(cb);
  window.addEventListener("storage", cb); // updates from other tabs too
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked; ignore
  }
  listeners.forEach((cb) => cb()); // tell every component using the hook
}

export function useStored(key, fallback) {
  const raw = useSyncExternalStore(subscribe, () => localStorage.getItem(key));

  const value = useMemo(() => {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }, [raw]);

  const setValue = (next) => {
    save(key, typeof next === "function" ? next(value) : next);
  };

  return [value, setValue];
}

export const defaultGoals = [];

export function useGoals() {
  const [goals, setGoals] = useStored("goals", defaultGoals);

  // adds a goal with whatever properties you pass, plus an auto id
  const addGoal = (goal) =>
    setGoals((prev) => [...prev, { ...goal, id: Date.now() }]);

  // changes only the properties you pass for the goal with this id
  const updateGoal = (id, changes) =>
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...changes } : g)));

  const removeGoal = (id) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  return { goals, setGoals, addGoal, updateGoal, removeGoal };
}