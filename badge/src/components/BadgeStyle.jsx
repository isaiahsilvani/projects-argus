import styled from '@emotion/styled'

const Button = styled.button`
  background-color: ${props => props.variantColor ? props.variantColor : `grey`};
  color: blue;
  margin: 10px;
  padding: 10px;
  width: 100px;
  display: flex;
`

export default Button