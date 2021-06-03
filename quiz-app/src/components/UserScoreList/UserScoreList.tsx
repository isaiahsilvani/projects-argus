import React, { useEffect } from 'react'
import * as userscore_api from '../../services/userscore-api'

const UserScoreList = () => {

    useEffect(() => {
      console.log('trigger API request')
      userscore_api.getUserScores()
      .then(data => {
        console.log('set data: ', data)
      })
    }, []);

    return (
      <div className="userscores-list">
          USER SCORES LIST
      </div>
    );
}

export default UserScoreList