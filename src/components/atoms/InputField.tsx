import * as React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 550px;
  height: 50px;
  border-radius: 10px;
  background: #eaeaea;
  border: 1px solid #afbf36;
`;

export interface InputFieldProps {}

const InputField: React.SFC<InputFieldProps> = () => <Input />;

export default InputField;
