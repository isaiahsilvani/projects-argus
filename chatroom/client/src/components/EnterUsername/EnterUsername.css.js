import styled from '@emotion/styled'

export const EnterUsernameBlock = styled.div`
  display: flex;
  margin-top: 5.5em;
  grid-column: span 2;
  background-color: white;
  height: 70%;
  border-radius: 30px;
  width: 80%;
  justify-self: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  -webkit-box-shadow: -1px 1px 5px 9px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 1px 5px 9px rgba(0,0,0,0.75);
  box-shadow: -1px 1px 5px 9px white;
`
export const H1 = styled.h1`
  font-size: 3em;
  margin-bottom: 30px;
`

export const Controls = styled.div`
  flex-direction: column;
`

export const Input = styled.input`
  font-size: 1.3em;
  padding: 5px;
  border-radius: 5px;
`

export const Button = styled.button`
  margin-top: 1.4em;
  font-size: 1.3em;
  padding: 10px;
  &:hover{
    background-color: #E6F7F7;
    cursor: pointer;
  }
  &:active{
    color: white;
    background-color: #138080
  }
  &:disabled{
    
  }
`