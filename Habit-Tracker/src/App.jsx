import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './componenets/home'

const initialCategories = [ 
    {
        id: "c9a646d3-9c61-4cd7-894e-3735ff88c603",
        name: "Fitness",
    },
    {
        id : "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        name: "Health",
    },
    {
        id : "6fa459ea-ee8a-3ca4-894e-db77e160355e",
        name : "Coding"
    },
    ];
  const initialHabits = [ {
            id: "3d9965d8-c340-4961-ad3e-111ee3663eeb",
            categoryId: "Fitness",             
            title: "Drink 2L Water",
            target: "2 Liters",             
            priority: "High",               
            status: "Completed Today",       
        },
        {
            id: "a1c720e4-984b-4a57-b2e1-4c6e9432f811",
            categoryId: "Fitness",
            title: "Morning Jog",
            target: "5 Kilometers",
            priority: "High",
            status: "Completed Today"
        },

        // 2 Coding
        {
            id: "7d3f9e12-b541-4e8c-a90f-3e2b5c4789d2",
            categoryId: "Coding",
            title: "Solve LeetCode Problems",
            target: "2 Problems",
            priority: "High",
            status: "In Progress"
        },
        {
            id: "e4b1086c-4823-4df5-91ae-62d4e7f8901c",
            categoryId: "Coding",
            title: "Open Source Contribution",
            target: "1 Pull Request",
            priority: "Medium",
            status: "Pending"
        },

        // 2 Health
        {
            id: "19d45a7b-3ce8-48b0-8c24-5d98fa12e345",
            categoryId: "Health",
            title: "Sleep Optimization",
            target: "8 Hours",
            priority: "High",
            status: "Completed Today"
        },
        {
            id: "9e5c7a31-6b2f-48d9-a417-0f83e291b5c4",
            categoryId: "Health",
            title: "Mindfulness Meditation",
            target: "15 Minutes",
            priority: "Low",
            status: "Pending"
        }
    ];
function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [habits, setHabits] = useState(initialHabits);

  return (
    <>
      <Routes>
          <Route path="/" 
            element={<Home 
            categories={categories} 
            setCategories={setCategories}
            habits={habits}
            setHabits = {setHabits}
          />} />
      </Routes>
      
    </>
  )
}

export default App
