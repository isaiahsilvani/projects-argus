import React, { useEffect } from 'react'
import * as userscore_api from '../../services/userscore-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'

const UserScores = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 3px solid black;
  -moz-box-shadow: 3px 3px 3px black;
  -webkit-box-shadow: 3px 3px 3px black;
  box-shadow: 7px 7px 7px black;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`

const Head = styled.span`
  font-size: 2.5em;
  font-weight: 900;
  margin: 10px 0 15px 0;
`

const Td = styled.td`
  margin: 20em;
  font-size: 1.3em;
  padding: 0.3em 1em;
`
const Hr = styled.hr`
  width: 100%;
  margin: 0;
  padding: 0;
`

const Thead = styled.thead`
  font-size: 1.3em;
  font-weight: 800;
  letter-spacing: 0.1em;
`

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