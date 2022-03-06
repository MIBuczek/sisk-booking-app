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
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  resize: none;
  padding: 10px;
  text-align: left;
  letter-spacing: -0.5px;
  border-color: ${({ invalid }) => (invalid ? '#cc0000' : '#afbf36')};
  &::hover {
    box-shadow: 0 0 5px 0 #eaeaea;
  }
  &::placeholder {
    color: #b9b8b8;
    text-align: left;
    font-family: 'Oswald', sans-serif;
  }
  @media (max-width: 890px) {
    width: 320px;
  }
`;

export default TextAreaField;
