import styled from 'styled-components';

type InputType = {
  invalid?: boolean;
};

const TextInputField = styled.input<InputType>`
  width: 290px;
  height: 35px;
  border-radius: 5px;
  background: #eaeaea;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  padding: 10px;
  letter-spacing: -0.5px;
  border: ${({ invalid }) => (invalid ? '1px solid #cc0000' : '1px solid #afbf36')};
  transition: 0.4s;
  &:active,
  &:focus {
    box-shadow: inset 0px -17px 15px -25px rgb(66 68 90);
  }
  &::placeholder {
    color: #b9b8b8;
    text-align: center;
  }
  &:disabled {
    color: #b9b8b8;
  }
  @media (max-width: 890px) {
    width: 240px;
  }
`;

export default TextInputField;
