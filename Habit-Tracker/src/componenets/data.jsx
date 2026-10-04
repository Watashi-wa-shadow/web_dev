import {useState} from 'react';

export function Data(){
    const [categories, setCategories] = useState([ 
    {
        id: "cat-1",
        name: "Fitness & Health",
        icon: "dumbbell", // or Lucide icon name
        color: "#10B981"
    }
    ]);
    const [habits, setHabits] = useState([ {
            id: "habit-1",
            categoryId: "cat-1",            // Links to the Category object
            title: "Drink 2L Water",
            target: "2 Liters",             // Target Time / Reps
            priority: "High",               // "High" | "Medium" | "Low"
            status: "Completed Today",      // "Not Started" | "In Progress" | "Completed Today"
            currentStreak: 5,
            bestStreak: 12,
            lastCompletedDate: "2026-09-23" // YYYY-MM-DD (Used for daily reset & streak calculation)
        } 
    ]);
}