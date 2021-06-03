import React, { useEffect } from 'react'
import * as userscore_api from '../../services/userscore-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'

const UserScores = styled.div`
  padding: 10px;
  background-color: lightblue;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`

const Td = styled.td`
  margin: 20em;
  font-size: 1.3em;
  padding: 0.3em 1em;
`

const Table = styled.table`
  border: 1px solid black;
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
        <h2>User Scores</h2>
        <Table>
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
        </Table>
        </UserScores>
      </div>
    );
}

export default UserScoreList