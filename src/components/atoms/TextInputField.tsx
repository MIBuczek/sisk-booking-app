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
  padding: 10px;
  letter-spacing: -0.5px;
  border-color: ${({ invalid }) => (invalid ? '#cc0000' : '#afbf36')};
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
