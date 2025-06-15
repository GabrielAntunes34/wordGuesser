import React from 'react';
import './GuessGamePage.css'
import { useGame } from '../contexts/gameContext';
import { useNavigate } from 'react-router-dom';
import { formatTime, shuffle, checkAnswer } from '../utils/gameFuncs';
import { useState, useEffect } from 'react';

// Implements the main game's logic and interface

const MyGamePage = () => {
    const Navigate = useNavigate();
    const {wordTags} = useGame();
    const [newOrder, setNewOrder] = useState(null);
    const [gameTime, setGameTime] = useState(0);
    const [answer, setAnswer] = useState('');
    const [progress, setProgress] = useState(0);
    const [feedBack, setFeedBack] = useState(null);
    const [hits, setHits] = useState(0);

    // Generates a shuffled list from words at every play
    useEffect(() => {
        setNewOrder(shuffle(wordTags));
    }, []);

    // Updates the game timer at eatch second if the player is in
    // Response state
    useEffect(() => {
        const timeInterval = setInterval(() => {
            if(!feedBack && progress < wordTags.length)
                setGameTime(prev => prev + 1);
        }, 1000);

        // Resets everything at component's exit
        return () => clearInterval(timeInterval);
    }, []);

    // Redirects user to a new page after all the answers
    useEffect(() => {
        if (newOrder && progress >= newOrder.length) {
            Navigate('/endGame', {
            state: {
                hits
            }
            });
        }
    }, [progress]);

    // Handles the user's asnwer
    const handleAnswer = (e) => {
        e.preventDefault();

        // Verifying the answer
        const success = checkAnswer(answer, newOrder[progress].translations);
        if(success) {
            setFeedBack('Correct!');
            setHits(prev => prev + 1);
        }
        else
            setFeedBack('Incorrect :(');

        // Timer to next word guess
        setTimeout(() => {
            setProgress(prev => prev + 1);
            setAnswer('');
            e.target.value = '';
            setFeedBack(null);
        }, 1000);
    }

    return (
        <div className='game-div'>
            <p>{formatTime(gameTime)}</p>

            {newOrder && progress < newOrder.length ? (
                <h1 className='guess-word'>{newOrder && newOrder[progress].word}</h1>
            ) : (
                <h1 className='guess-word'>No more words</h1>
            )}
            <span className="progress-counter">{progress} / {newOrder && newOrder.length}</span>

            <form onSubmit={handleAnswer}>
                <input 
                    type="text"
                    placeholder="Wondering what it should be?"
                    onChange={e => setAnswer(e.target.value)}
                    value={answer}
                    />
                <button type='submit'>Send</button>
            </form>
            {feedBack && <p className='feedBack-message'>{feedBack}</p>}

        </div>
    )
};

export default MyGamePage;