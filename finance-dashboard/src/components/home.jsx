import { Mandatory } from "./mandatory";
import {useState, useMemo, useEffect} from 'react';
import { Transcation } from "./transaction";
import { Charts } from "./charts";
import './home.css'
export function Home(
    {income,onIncomeChange, expenses,onExpenseChange, cashflow, setCashflow }
){
    const [isEditingIncome, setIsEditingIncome] = useState(false);
    const [incomeDraft, setIncomeDraft] = useState(income);
    const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth().toString());

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    function changeIncome(){
        onIncomeChange(Number(incomeDraft));
        setIsEditingIncome(false);
    }
    const filteredCashflow = useMemo(() => {
        if (selectedMonth === "all") return cashflow;

        const currentYear = new Date().getFullYear();
        return cashflow.filter((item) => {
            const d = new Date(item.date);
            return d.getMonth() === Number(selectedMonth) && d.getFullYear() === currentYear;
        });
    }, [cashflow, selectedMonth]);

    // Calculate total expenses for the selected filter
    const selectedMonthExpenses = useMemo(() => {
        return filteredCashflow.reduce((sum, item) => sum + Number(item.amount), 0);
    }, [filteredCashflow]);

    // Sync total with parent component
    useEffect(() => {
        onExpenseChange(selectedMonthExpenses);
    }, [selectedMonthExpenses, onExpenseChange]);
    return(
        <>
            
            <div className="home">
                <div className="mandatory">
                    <Mandatory />
                </div>
                <div className="other-part">
                    <div className="month-filter" style={{ marginBottom: "1rem" }}>
                        <label htmlFor="month-select" style={{ marginRight: "0.5rem" }}>Filter by Month:</label>
                        <select
                            id="month-select"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option value="all">All Months</option>
                            {months.map((name, index) => (
                                <option key={name} value={index}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="Total-amount">
                        <div className="balance money">
                            <p >Total balance </p>
                            <p className="font">${income - expenses}</p>
                        </div>
                        <button
                            className="income money "
                            onClick={() => !isEditingIncome && setIsEditingIncome(true)}
                            >
                            <p className="id1">Income </p>
                            {isEditingIncome ? (
                                <input
                                className="font edit-income"
                                type="number"
                                value={incomeDraft}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setIncomeDraft(e.target.value)}
                                onBlur={changeIncome}
                                onKeyDown={(e) => e.key === "Enter" && changeIncome()}
                                />
                            ) : (
                                <p className="font edit-income">${income}</p>
                            )}
                        </button>
                        <div className="expense money">
                            <p>Expense </p>
                            <p className="font">${expenses}</p>
                        </div>
                    </div>
                    <div className="charts">
                        <Charts 
                            monthlyCashflow={filteredCashflow}
                        />
                    </div>
                    <div className="transaction">
                        <Transcation 
                           cashflow = {filteredCashflow}
                            setCashflow={setCashflow}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}