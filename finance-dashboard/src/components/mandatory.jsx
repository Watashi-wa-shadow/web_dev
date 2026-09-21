
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './mandatory.css'

export function Mandatory() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    })

    // Synchronize document body class and localStorage whenever isDark changes
    useEffect(() => {
        if (isDark) {
        document.body.classList.add('dark-theme')
        localStorage.setItem('theme', 'dark')
        } else {
        document.body.classList.remove('dark-theme')
        localStorage.setItem('theme', 'light')
        }
    }, [isDark])

    const handleToggle = () => {
        setIsDark((prev) => !prev)
    }
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
                <button 
                    className="btn" 
                    type="button" 
                    onClick={handleToggle}
                    >
                    {isDark ? 'on' : 'off'}
                </button>
            </div>
        </div>
    )
}

