import { Mandatory } from './mandatory';
import { Data } from './data';
import './home.css';
export function Home(){
    return(
        <>
            <div className='mandatory'>
                <Mandatory />
            </div>
            <div className='other-part'>

            </div>
        </>
    )
}