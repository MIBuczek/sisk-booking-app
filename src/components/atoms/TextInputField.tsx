import * as React from 'react';
import styled from 'styled-components';

const Input = styled.input`
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

export interface IProps {
  placeholder: string;
  property: string;
  value: string;
  handler: (value: string, property: string) => void;
  ref: React.Ref<HTMLInputElement> | undefined;
}

const TextInputField: React.FC<IProps> = React.forwardRef(
  ({ placeholder, value, property, handler }, ref) => (
    <Input
      name={property}
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => handler(target.value, property)}
      ref={ref}
    />
  )
);

export default TextInputField;
