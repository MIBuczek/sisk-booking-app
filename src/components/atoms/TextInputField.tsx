// import * as React from 'react';
import styled from 'styled-components';

type InputType = {
  invalid?: boolean;
};

const TextInputField = styled.input<InputType>`
  width: 290px;
  height: 35px;
  border-radius: 5px;
  background: #eaeaea;
  border: 1px solid #afbf36;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  /* margin: ${({ theme }) => theme.fontSize.xs} 0; */
  padding: 10px;
  text-align: left;
  letter-spacing: -0.5px;
  border-color: ${({ invalid }) => (invalid ? '#cc0000' : '#afbf36')};
  &::hover {
    box-shadow: 0 0 5px 0 #eaeaea;
  }
  &::placeholder {
    color: #b9b8b8;
    text-align: center;
  }
`;

export default TextInputField;
