import styled from 'styled-components';

const Button = styled.button`
  width: 100px;
  height: 30px;
  color: ${({ theme }) => theme.darkColor};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  border: 1px solid ${({ theme }) => theme.darkColor};
  background: ${({ theme }) => theme.green};
  border-radius: 10px;
  font-family: inherit;
  margin: 1rem 0;
  cursor: pointer;
`;

export default Button;
