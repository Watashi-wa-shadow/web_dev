import './mandatory.css';
export function Mandatory({categories}){
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
            {categories.map(c => (
                <div  key = {c.id}  className='common'>
                    {c.name}
                </div>
            ))}
        </div>
        </>
    )
}