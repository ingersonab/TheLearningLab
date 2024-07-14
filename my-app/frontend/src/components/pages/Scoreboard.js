import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';

function Scoreboard() { 
    const [gameData, setGameData] = useState([]);
    const [scoreboardList, setScoreboardList] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        const userId = sessionStorage.getItem('userId');
        axios.get(`http://localhost:8081/scoreboardlist/${userId}`)
        .then(res => {
            setScoreboardList(res.data.result);
            const courseId = res.data.courseId;
            axios.get(`http://localhost:8081/getscoreboarddata/${courseId}`)
            .then(res => {
               setGameData(res.data.gameData) 
            })
        })
        .catch(err => {
            console.error('Error retrieving scoreboard list: ', err)
        })


    }, [])

    return (
        <>
            <div className="scoreboard-container">
                <div className='header-container' style={{textAlign: 'center'}}>
                    <img src={require('../../logo.jpeg')} alt='logo image' height={100} width={100} />
                    <h2>Scoreboards</h2>
                    <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
                </div>
                {scoreboardList.map(scoreboard => (
                    <div className="table-container" style = {{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
                        <h4>{scoreboard.courseName}</h4>
                        <table style={{boxShadow: '10px 10px 5px'}}>
                            <tr>
                                <th>&nbsp;&nbsp;Rank&nbsp;&nbsp;</th>
                                <th>&nbsp;&nbsp;ID&nbsp;&nbsp;</th>
                                <th>&nbsp;&nbsp;Name&nbsp;&nbsp;</th>
                                <th>&nbsp;&nbsp;Score&nbsp;&nbsp;</th>
                            </tr>
                            {gameData.map((student, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>&nbsp;&nbsp;{idx + 1}&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;{student.student_id}&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;{student.name}&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;{student.score}&nbsp;&nbsp;</td>
                                </tr>
                            )
                        })}

                        </table>
                    </div>
                ))}    
                
            </div>
        </>
    )
}

export default Scoreboard;