import React from 'react';
import './EndGamePage.css';
import { useLocation } from 'react-router-dom';

// Shows the user his game's results

const EndGamePage = () => {
    // recieving all props from Navigate
    const location = useLocation();
    const { hits } = location.state || {};

    return (
        <div className='endgame-div'>
            <h1>Congratulations!</h1>
            <p>You've accurately translated {hits} words!</p>
        </div>
    )
};

export default EndGamePage;