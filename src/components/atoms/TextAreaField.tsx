import styled from 'styled-components';

const TextAreaField = styled.textarea`
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
  &::hover {
    box-shadow: 0 0 5px 0 #eaeaea;
  }
  &::placeholder {
    color: #b9b8b8;
    text-align: left;
    font-family: 'Oswald', sans-serif;
  }
`;

export default TextAreaField;
