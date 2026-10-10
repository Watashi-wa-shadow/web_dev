import { Mandatory } from './mandatory';
import { useEffect } from "react";
import './home.css';
export function Home({ categories,setCategories, habits,setHabits }){
    return(
        <>
            <div className='mandatory'>
                <Mandatory 
                    categories={categories}
                    setCategories = {setCategories}
                />
            </div>
            <div className='other-part'>
                <div className = 'Habit-details'>
                    {habits.map(c => (
                    <div  key = {c.id}  className='habits'>
                        <p className='habits-P'>categories : {c.categoryId}</p>
                        <p className='habits-P'>Title : {c.title}</p>
                        <p className='habits-P'>Traget : {c.target}</p>
                        <p className='habits-P'>Priority : {c.priority}</p>
                        <p className='habits-P'>Status : {c.status}</p>
                    </div>
                ))}
                </div>
                
            </div>
        </>
    )
}