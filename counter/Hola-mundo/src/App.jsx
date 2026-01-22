import './App.css'
import React, { useState } from 'react';

export function App() {

    const [counter, setCounter] = useState(0);
    const increase = () => {
        setCounter(counter + 1);
    }

    return (
        <article className='visit-card'>
            <header className='visit-card-info'>
                <div className='info'>
                    <strong>San Francisco</strong>
                    <div className='bottons'>
                        <button className="counter-button" onClick={increase}>I like it</button>
                        <p>{counter}</p>
                    </div>
                </div>
            </header>
        </article>
    )
}