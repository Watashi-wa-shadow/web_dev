import { Mandatory } from "./mandatory";
import { Transcation } from "./transaction";
import { Charts } from "./charts";
import './home.css'
export function Home(
    { balance, income, expenses, cashflow, setCashflow }
){
    return(
        <>
            
            <div className="home">
                <div className="mandatory">
                    <Mandatory />
                </div>
                <div className="other-part">
                    <div className="Total-amount">
                        <div className="balance money">
                            <p >Total balance </p>
                            <p className="font">${balance}</p>
                        </div>
                        <div className="income money">
                            <p className="id1">Income </p>
                            <p className="font">${income}</p>
                        </div>
                        <div className="expense money">
                            <p>Expense </p>
                            <p className="font">${expenses}</p>
                        </div>
                    </div>
                    <div className="charts">
                        <Charts 
                            cashflow={cashflow}
                        />
                    </div>
                    <div className="transaction">
                        <Transcation 
                           cashflow = {cashflow}
                            setCashflow={setCashflow}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}