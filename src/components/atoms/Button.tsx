import styled from 'styled-components';

type ButtonProps = {
  large?: boolean;
  secondary?: boolean;
};

const Button = styled.button<ButtonProps>`
  color: ${({ theme }) => theme.darkGrey};
  background: ${({ theme, secondary }) => (secondary ? theme.middleGray : theme.green)};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.regular};
  border: ${({ theme }) => `1px solid ${theme.green}`};
  font-family: inherit;
  margin: 1rem 0;
  cursor: pointer;
  padding: ${({ large }) => (large ? '12px 20px' : '8px 14px')};
  border-radius: 3px;
  letter-spacing: -0.5px;
  transition: 0.4s;
  &:hover {
    box-shadow: 0px 0px 17px -7px rgba(66, 68, 90, 1);
    opacity: 0.8;
  }
  &:disabled {
    background: ${({ theme }) => theme.middleGray};
  }
`;

export default Button;
