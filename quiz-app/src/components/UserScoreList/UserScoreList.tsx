import React, { useEffect } from 'react'

const UserScoreList = () => {

    useEffect(() => {
      console.log('trigger API request')
    }, []);

    return (
      <div className="userscores-list">
          USER SCORES LIST
      </div>
    );
}

export default UserScoreList