import styled from 'styled-components';

type ButtonProps = {
  primary?: boolean;
};

const Button = styled.button<ButtonProps>`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.regular};
  border: 1px solid ${({ theme }) => theme.green};
  font-family: inherit;
  margin: 1rem 0;
  cursor: pointer;
  color: #ffffff;
  padding: ${({ primary }) => (primary ? '12px 20px' : '8px 6px')};
  border-radius: 3px;
  letter-spacing: -0.5px;
  transition: 0.4s;
  &:hover {
    box-shadow: 0px 3px 5px 0px rgb(0 0 0 / 40%);
    opacity: 0.8;
  }
`;

export default Button;
