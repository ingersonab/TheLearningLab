import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Unity, useUnityContext} from 'react-unity-webgl';
import { useParams, useNavigate } from 'react-router-dom';
import './Game.css';

function Game() {

    const unityContext = useUnityContext({
        loaderUrl: `${process.env.PUBLIC_URL}/unity_builds/QuizGameProjectBuildUpdated5/Build/QuizGameProjectBuildUpdated5.loader.js`,
        dataUrl: `${process.env.PUBLIC_URL}/unity_builds/QuizGameProjectBuildUpdated5/Build/QuizGameProjectBuildUpdated5.data`,
        frameworkUrl: `${process.env.PUBLIC_URL}/unity_builds/QuizGameProjectBuildUpdated5/Build/QuizGameProjectBuildUpdated5.framework.js`,
        codeUrl: `${process.env.PUBLIC_URL}/unity_builds/QuizGameProjectBuildUpdated5/Build/QuizGameProjectBuildUpdated5.wasm`,
    });

    const navigate = useNavigate();

    console.log('Unity Context 1:', unityContext);
    const [score, setScore] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

    const {gameId} = useParams();

    const handleSubmit = (event) => {  
       event.preventDefault();
       try{
            axios.get('http://localhost:8081/getScore')
            .then(res => {
                const grabbedScore = res.data.score;
                setScore(grabbedScore);
                const studentId = sessionStorage.getItem('userId'); 
                console.log('Score:', score);
                if(studentId){
                    axios.post('http://localhost:8081/addGameData', {gameId: gameId, studentId: studentId, score: grabbedScore})
                    .then(res => {
                        alert("Game Data Saved Successfully!");
                        navigate('/studentcoursehome');
                    })
                    .catch(err => {
                        console.error(err);
                        alert("An unexpected error occurred.");
                    });
                }
            })
        }catch (error){
            console.error('Error adding game data:', error);
        }

    }

    return (
        <>
            <div className='game-container'>
            <div className="game-info">
                    <h3 className="score" style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>Game Score: {score}</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <button type='submit' className='px-4'  style={{ backgroundColor: '#f2352e', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", fontSize: '20px', padding: '12px 24px' }}>Exit</button>
                    </form>
                </div>
                <Unity unityProvider={unityContext.unityProvider} style={{ width: '70%', height: '70%' }} />
            </div>
            
        </>
    );
}

export default Game;