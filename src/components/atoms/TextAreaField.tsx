import styled from 'styled-components';

type TextAreaType = {
  invalid?: boolean;
};

const TextAreaField = styled.textarea<TextAreaType>`
  width: 390px;
  height: 135px;
  border-radius: 5px;
  background: #eaeaea;
  border: 1px solid #afbf36;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  resize: none;
  padding: 10px;
  text-align: left;
  letter-spacing: -0.5px;
  border-color: ${({ invalid }) => (invalid ? '#cc0000' : '#afbf36')};
  transition: 0.4s;
  &:active,
  &:focus {
    box-shadow: inset 0px -17px 15px -25px rgb(66 68 90);
  }
  &::placeholder {
    color: #b9b8b8;
    text-align: left;
    font-family: 'Oswald', sans-serif;
  }
  &:read-only {
    color: #b9b8b8;
  }
  @media (max-width: 890px) {
    width: 320px;
  }
`;

export default TextAreaField;
