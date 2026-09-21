import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './components/home'
import { Mandatory } from './components/mandatory'
import { Transcation } from './components/transaction'
import { Charts } from './components/charts'
import { Goals } from './components/goals'
import { useStored, defaultSummary } from './components/storage'

import './App.css'

function App() {
    const [balance, setBalance] = useState(defaultSummary.balance);
    const [income, setIncome] = useState(defaultSummary.income);
    const [expenses, setExpenses] = useState(defaultSummary.expenses);

    const [cashflow, setCashflow] = useStored("cashflow", []);
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