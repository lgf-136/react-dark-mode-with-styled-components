import React from 'react';
import styled from 'styled-components';
const MyBtn = styled.button`
  margin: 15px;
  padding: 10px;
  background-color: ${(props) => props.theme.color.bgPrimary};
`;
export default function Demo() {
  return (
    <div>
      <h2>Demo</h2>
      <MyBtn>Demo Button</MyBtn>
    </div>
  );
}
