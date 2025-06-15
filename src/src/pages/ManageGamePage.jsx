import React from 'react';
import './ManageGamePage.css'
import { Link } from 'react-router-dom';
import WordInput from '../components/WordInput'
import TagItem from '../components/TagItem';
import { useGame } from '../contexts/gameContext';
import { useState } from 'react';

// Page to manage and instanciate a new Guessing game
const MyGamePage = () => {
    const [error, setError] = useState('');
    const {loadCSV, wordTags, languages} = useGame();

    // Gets a csv file and load it's data into our wordtag list
    const handleGetFile = (e)=>{
        try {
            const file = e.target.files[0]
            loadCSV(file)
        }
        catch(err) {
            setError('Invalid file');
        }
    }

    return (
        <div className='manage-game'>
            <h2>Game manager</h2>

            {languages && <h3>{languages.mainLang} - {languages.translationLang}</h3>}

            <WordInput />

            <div className='word-list'>
                  <ul>
                    {wordTags.map((tag, i) => (
                    <TagItem index={i} tag={tag}/>
                    ))}
                </ul>
            </div>

            <input className='csv-loader' type="file" 
                accept='.csv'
                onChange = {(e)=>{handleGetFile(e)}}
                required
            />
            <br/>
            {error && <p className='error-message'>{error}</p>}

            {wordTags.length > 0 && <Link to='/guessGame'>Start game</Link>}

        </div>
    )
};

export default MyGamePage;