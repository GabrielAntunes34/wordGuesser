import React, { useState } from 'react';
import { useGame } from '../contexts/gameContext';

const WordInput = () => {
    const { addWordTag } = useGame();
    const [error, setError] = useState('');
    const [newWord, setNewWord] = useState('');

    const handleWordAdding = () => {
        // Verifying if the giving string is correctly formated
        const testStr = newWord.trim();
        if(!testStr.includes(':')) {
            setError('Invalid format, place the values between \':\'');
            return;
        } 
        
        // Verifying if it has both words
        const separatorIndex = testStr.indexOf(':')
        if(separatorIndex == 0) {
            setError('You need to inform the original language\'s word');
            return;
        }
        if(separatorIndex == testStr.length - 1) {
            setError('You need to include at least one translation');
            return;
        }
        
        // Updating our wordList
        addWordTag(newWord);
    }  

    return (
        <div className='word-adder'>
            <label>Add a new word!</label><br/>
            <input 
                type="text"
                onChange={e => setNewWord(e.target.value)}
                placeholder='word : translation'
            />

            <button 
                className='word-adder-btn'
                onClick={handleWordAdding}
            >add</button>
            {error && <p className='error-message'>{error}</p>}
        </div>
    )
}

export default WordInput;