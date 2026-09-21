import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './components/home'
import { Mandatory } from './components/mandatory'
import { Transcation } from './components/transaction'
import { Charts } from './components/charts'
import { Goals } from './components/goals'

import './App.css'

function App() {
    const [balance, setBalance] = useState(100000);
    const [income, setIncome] = useState(50000);
    const [expenses, setExpenses] = useState(20000);
    const [cashflow, setCashflow] = useState([
    { id: 1,  date: "2026-09-01", description: "Monthly rent",        category: "rent",          amount: 20000 },
    { id: 2,  date: "2026-09-02", description: "Groceries",           category: "food",          amount: 2500 },
    { id: 3,  date: "2026-09-03", description: "Train ticket to Delhi", category: "travel",      amount: 1800 },
    { id: 4,  date: "2026-09-05", description: "September salary",    category: "salary",        amount: 60000 },
    { id: 5,  date: "2026-09-07", description: "Electricity bill",    category: "utilities",     amount: 1400 },
    { id: 6,  date: "2026-09-10", description: "New headphones",      category: "shopping",      amount: 3200 },
    { id: 7,  date: "2026-09-12", description: "Movie night",         category: "entertainment", amount: 700 },
    { id: 8,  date: "2026-09-15", description: "Dinner with friends", category: "food",          amount: 1200 },
    { id: 9,  date: "2026-09-18", description: "Cab to airport",      category: "travel",        amount: 900 },
    { id: 10, date: "2026-09-20", description: "Internet bill",       category: "utilities",     amount: 800 },
    ]);
    return (
        <BrowserRouter>

            <Mandatory />

            <Routes>
                <Route path="/" element={<Home 
                    balance={balance}
                    income={income}
                    expenses={expenses}
                    cashflow = {cashflow}
                    setCashflow={setCashflow}
                />} />
                <Route path="/transcation" element={<Transcation 
                    cashflow = {cashflow}
                    setCashflow={setCashflow}
                />} />
                <Route path="/charts" element={<Charts 
                    cashflow={cashflow}
                />} />
                <Route path="/goals" element={<Goals />} />
            </Routes>

        </BrowserRouter>
    )
}

export default App