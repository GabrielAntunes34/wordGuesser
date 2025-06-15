import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../contexts/gameContext';
import { useState, useEffect, useContext } from 'react';

const MyGamePage = () => {
    const {loadCSV, wordTags, languages} = useGame();

    const handleWordAddition = (e) => {

    }

    const handleGetFile = (e)=>{
        const file = e.target.files[0]
        const result = loadCSV(file)

        console.log("Resultado da operacao: ", result)
    }


    return (
        <>
            <h2>Game manager</h2>

            {languages && <h3>{languages.mainLang} - {languages.translationLang}</h3>}

            <div className='word-adder'>
                <label>Add a new word!</label><br/>
                <input 
                    type="text"
                    placeholder='word : translation'
                />

                <button className='word-adder-btn'>add</button>
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

            {wordTags && <Link to='/guessGame'>Start game</Link>}

        </>
    )
};

export default MyGamePage;