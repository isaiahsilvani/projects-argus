import { useEffect } from 'react'
import * as userscore_api from '../../services/userscore-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { UserScores, Head, Hr, Thead, Td } from './UserScoresList.css.js'

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
        <UserScores>
        <Head>User Scores</Head>
        <Hr></Hr>
        <table>
          <Thead>
            <tr>
              <Td>Username</Td>
              <Td>Score</Td>
              <Td>Difficulty</Td>
            </tr>
          </Thead>
          <tbody>
            {userScores.length === 0 && <p>Loading...</p>}
            {userScores.map((userscore: any, idx: string) => (
              <tr key={idx}>
                <Td>{userscore.username}</Td>
                <Td>{userscore.score}</Td>
                <Td>{userscore.difficulty}</Td>
              </tr>
            ))}
          </tbody>
        </table>
        </UserScores>
      </div>
    );
}

export default UserScoreList