import styled from '@emotion/styled'

export const HeaderBlock = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: white;
  height: 10vh;
  background: rgb(34,193,195);
  background: linear-gradient(0deg, #fdbb2d 0%, white 25%);
  display: grid;
`
export const DeleteMsgs = styled.div`
  text-align: left;
  display: flex;
  height: 100%;
  font-family: 'Ubuntu', sans-serif;
  justify-content: space-between;
  background: rgb(208,201,229);
  background: linear-gradient(90deg, rgba(208,201,229,1) 25%, rgba(214,239,240,1) 75%);
  align-items: center;
  padding-right: 3em;
`
export const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
export const Button = styled.button`
  font-size: 1.1em;
  letter-spacing: 0.04em;
  padding: 10px;
  justify-self: end;
  border-radius: 4px;
  &:hover{
    background-color: #E6F7F7;
    cursor: pointer;
  }
  &:active{
    color: white;
    background-color: #138080
  }
`
export const Span = styled.span`
  font-size: 2em;
  align-self: center;
  display: flex;
  justify-content: center;
  font-weight: 600;
  letter-spacing: 0.07em;
  margin-bottom: 15px;
`
export const NextSpan = styled.span`
  font-size: 2em;
  text-decoration: underline;
  font-weight: bold;
  letter-spacing: 0.07em;
  justify-self: center;
`