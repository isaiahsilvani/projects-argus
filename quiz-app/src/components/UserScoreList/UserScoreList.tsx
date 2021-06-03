import React, { useEffect } from 'react'
import * as userscore_api from '../../services/userscore-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'

const UserScoreList = () => {
    const dispatch = useDispatch()
    const { setUserScores } = bindActionCreators(actionCreators, dispatch)
    const userScores = useSelector((state: any) => state.userscores)

    // set userscores in state onmount only if state is currently empty
    useEffect(() => {
      if(userScores.length === 0){
        userscore_api.getUserScores()
        .then(data => {
          setUserScores(data)
        })
      }

    }, []);

    return (
      <div className="userscores-list">
        <h5>User Scores</h5>
        <table>
          <thead>
            <tr>
              <td>Username</td>
              <td>Score</td>
              <td>Difficulty</td>
            </tr>
          </thead>
          <tbody>
            {userScores.map((userscore: any, idx: string) => (
              <tr key={idx}>
                <td>{userscore.username}</td>
                <td>{userscore.score}</td>
                <td>{userscore.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default UserScoreList