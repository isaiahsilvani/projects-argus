import React from 'react';
import styled from '@emotion/styled'
import Button from './BadgeStyle'


const Primary = styled(Button)`
  background-color: orange;
  color: white;
`

const Display = styled.div`
  display: flex;
  flex-direction: row;
`

const Badge = () => {
  return (
    <div>
      <Display>
        <Button>Badge Component</Button>
        <Primary>Badge Component</Primary>
        <Button variantColor="green">Green Component</Button>
        <Button variantColor="purple">Purple Component</Button>
      </Display>
    </div>
  );
}

export default Badge