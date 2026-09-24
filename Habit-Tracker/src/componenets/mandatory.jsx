import './mandatory.css';
export function Mandatory(){
    return(
        <>
        <div>
            <h1 className='header'>Habit Tracker</h1>
        </div>
        <div className='dash'>
            Dashboard
        </div>
        <div className='access'>
            <h3 className='header3'>Quick access to</h3>
            <div className='common'>
                Fitness
            </div>
            <div className='common'>
                coding
            </div>
            <div className='common'>
                wellness
            </div>
        </div>
        </>
    )
}