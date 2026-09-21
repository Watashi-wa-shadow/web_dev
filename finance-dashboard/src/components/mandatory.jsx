
import { Link } from 'react-router-dom'
import './mandatory.css'

export function Mandatory() {
    return (
        <div className="mandatory">
            <div className="link-box">
                <Link to="/">Home</Link>
            </div>

            <div className="link-box">
                <Link to="/transcation">Transaction</Link>
            </div>

            <div className="link-box">
                <Link to="/charts">Charts</Link>
            </div>

            <div className="link-box">
                <Link to="/goals">Goals</Link>
            </div>
            <div className='dark-mode'>
                <p>dark mode </p>
                <button className='btn'> on</button>
            </div>
        </div>
    )
}

