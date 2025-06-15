import React from 'react';
import { useGame } from '../contexts/gameContext';
import { formatTime, shuffle } from '../utils/gameFuncs';
import { useState, useEffect, useContext } from 'react';

const MyGamePage = () => {
    const {wordTags} = useGame();
    const [newOrder, setNewOrder] = useState(null);
    const [gameTime, setGameTime] = useState(0);
    const [userTranslation, setUserTranslation] = useState('');
    const [progress, setProgress] = useState(0);

    // Generates a shuffled list from words at every play
    useEffect(() => {
        console.log(wordTags);

        setNewOrder(shuffle(wordTags));
    }, []);

    // Updates the game timer at eatch second
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setGameTime(prev => prev + 1);
        }, 1000);

        // Resets everything at component's exit
        return () => clearInterval(timeInterval);
    }, []);


    return (
        <>
            <p>{formatTime(gameTime)}</p>

            <h1 className='guessWord'>{newOrder && newOrder[0].word}</h1>
        </>
    )
};

export default MyGamePage;