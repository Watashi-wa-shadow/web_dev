import { Mandatory } from './mandatory';
import { Data } from './data';
import './home.css';
export function Home({ categories, habits }){
    return(
        <>
            <div className='mandatory'>
                <Mandatory 
                    categories={categories}
                />
            </div>
            <div className='other-part'>

            </div>
        </>
    )
}