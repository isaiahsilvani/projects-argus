import styled from '@emotion/styled'

export const InputDiv = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const H = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
`
export const Input = styled.input`
  font-size: 1.5em;
  margin-bottom: 15px;
`
export const Button = styled.button`
  width: 70%;
  font-size: 1.5em;
  margin: 10px;
  text-align: center;
  justify-self: center;
  background: rgb(255,175,189);
  background: radial-gradient(circle, rgba(255,175,189,1) 15%, rgba(255,195,160,1) 76%, rgba(255,231,0,1) 97%);
  &:hover{
    color: white;
    border-color: white;
    background: rgb(253,187,45);
    background: radial-gradient(circle, rgba(253,187,45,1) 6%, rgba(240,214,214,1) 93%);
    cursor: pointer;
  }
`