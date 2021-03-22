// import * as React from 'react';
import styled from 'styled-components';

const TextInputField = styled.input`
  width: 330px;
  height: 35px;
  border-radius: 10px;
  background: #eaeaea;
  border: 1px solid #afbf36;
  color: ${({ theme }) => theme.darkColor};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  margin: ${({ theme }) => theme.fontSize.xs} 0;
  &::hover {
    box-shadow: 0 0 5px 0 #eaeaea;
  }
  &::placeholder {
    text-transform: uppercase;
    text-align: center;
  }
`;

export default TextInputField;
