import './mandatory.css';
export function Mandatory(){
    return(
        <>
        <div>
            <h1 className='header'>Habit Tracker</h1>
        </div>
        <div className='dash'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M9 21v-6h6v6" />
            </svg> Dashboard
        </div>
        <div className='access'>
            <h3 className='header3'>Quick access to</h3>
            <div className='common'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9v6" />
                <path d="M18 9v6" />
                <path d="M3 10v4" />
                <path d="M21 10v4" />
                <path d="M6 12h12" />
                <path d="M3 12h3" />
                <path d="M18 12h3" />
                </svg>  Fitness
            </div>
            <div className='common'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="13" rx="1" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                </svg>coding
            </div>
            <div className='common'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.8 8.8c0 5.5-8.8 11-8.8 11S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" />
                </svg>wellness
            </div>
        </div>
        </>
    )
}