// import * as React from 'react';
import styled from 'styled-components';

const TextInputField = styled.input`
  width: 390px;
  height: 35px;
  border-radius: 10px;
  background: #eaeaea;
  border: 1px solid #afbf36;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  margin: ${({ theme }) => theme.fontSize.xs} 0;
  padding: 10px;
  text-align: left;
  letter-spacing: -0.5px;
  &::hover {
    box-shadow: 0 0 5px 0 #eaeaea;
  }
  &::placeholder {
    text-transform: uppercase;
    text-align: center;
  }
`;

export default TextInputField;
