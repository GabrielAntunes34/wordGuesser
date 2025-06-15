import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { useGame } from '../contexts/gameContext';
import { useState, useEffect, useContext } from 'react';

const MyGamePage = () => {
    // Local state for new wordTags
    const [error, setError] = useState('');
    const [newWord, setNewWord] = useState('');
    const {loadCSV, wordTags, addWordTag, languages} = useGame();

    const handleWordAdding = () => {
        // Verifying if the giving string is correctly formated
        console.log("fdasfasdfadsfasd");
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

    const handleGetFile = (e)=>{
        try {
            const file = e.target.files[0]
            const result = loadCSV(file)
        }
        catch(err) {
            setError('Invalid file');
        }
    }


    return (
        <>
            <h2>Game manager</h2>

            {languages && <h3>{languages.mainLang} - {languages.translationLang}</h3>}

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

            <div className='word-list'>
                  <ul>
                    {wordTags.map((tag, i) => (
                    <li key={i}>{tag.word}: {tag.translations[0]}</li>
                    ))}
                </ul>
            </div>

            <input className='csv-loader' type="file" 
                accept='.csv'
                onChange = {(e)=>{handleGetFile(e)}}
                required
            />
            <br/>

            {wordTags.length > 0 && <Link to='/guessGame'>Start game</Link>}

        </>
    )
};

export default MyGamePage;