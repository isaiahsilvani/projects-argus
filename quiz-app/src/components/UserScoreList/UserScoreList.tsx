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
          {userScores.map((userscore: any, idx: string) => (
            <div key={idx}>
              <p>{userscore.username}</p>
              <p>{userscore.score}</p>
              <p>{userscore.difficulty}</p>
            </div>
          ))}
      </div>
    );
}

export default UserScoreList