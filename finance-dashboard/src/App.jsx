import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './components/home'
import { Mandatory } from './components/mandatory'
import { Transcation } from './components/transaction'
import { Charts } from './components/charts'
import { Goals } from './components/goals'
import { useStored, defaultSummary,useSummary } from './components/storage'

import './App.css'

function App() {
    const { income, expenses, setIncome, setExpenses } = useSummary();

    const [cashflow, setCashflow] = useStored("cashflow", []);
    return (
        <BrowserRouter>

            <Mandatory />

            <Routes>
                <Route path="/" element={<Home 
                    income={income}
                    onIncomeChange={setIncome}
                    expenses={expenses}
                    onExpenseChange={setExpenses}
                    cashflow = {cashflow}
                    setCashflow={setCashflow}
                />} />
                <Route path="/transcation" element={<Transcation 
                    cashflow = {cashflow}
                    setCashflow={setCashflow}
                />} />
                <Route path="/charts" element={<Charts 
                    monthlyCashflow={cashflow}
                />} />
                <Route path="/goals" element={<Goals />} />
            </Routes>

        </BrowserRouter>
    )
}

export default App