import React, { useEffect, useState } from 'react';

const wordInput = ({ words }) => {
    [inputStr, setInputStr] = useState('');

    useEffect()
    

    return (
        <>
        <div className='word-input'>
            <input 
                type="text"
                value={words}
                onChange={e => setInputStr(e.target.value)}
            />
            <button onClick={handleChange}>Add</button>
        </div>
        </>
    )
}