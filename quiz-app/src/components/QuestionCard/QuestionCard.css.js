import styled from '@emotion/styled'

export const QuestionCardStyle = styled.div`
  text-align: left;
  width: 100%;
  margin-left: 3em;
`
export const Div = styled.div`
  height: 62px;
`

export const Question = styled.div`
  font-size: 1.7em;
  font-weight: 500;
  width: 100%;
`

export const QuestionText = styled.div`
  font-size: 1.3em;
  margin: 1em 0;
`

export const Answer = styled.button`
  margin: 10px 0;
  color: black;
  font-size: 1.2em;
  padding: 8px 10px;
  background: rgb(210,245,244);
  background: linear-gradient(97deg, rgba(210,245,244,1) 0%, rgba(0,255,2,0.43187066974595845) 100%);
  &:hover{
    background: rgb(16,122,118);
    background: linear-gradient(97deg, rgba(16,122,118,1) 0%, rgba(28,108,1,1) 100%);
    color: white;
    cursor: pointer;
  }
  &:active{
    color: white;
    background-color: #138080
  }
  &:disabled{
    cursor: not-allowed;
    background: rgb(10,14,10);
    background: linear-gradient(97deg, rgba(10,14,10,0.43187066974595845) 0%, rgba(239,241,241,1) 100%);
  }

`