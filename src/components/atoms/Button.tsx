import styled from 'styled-components';

type ButtonProps = {
  primary?: boolean;
};

const Button = styled.button<ButtonProps>`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  border: 1px solid ${({ theme }) => theme.green};
  font-family: inherit;
  margin: 1rem 0;
  cursor: pointer;
  color: #ffffff;
  padding: ${({ primary }) => (primary ? '12px 20px' : '8px 6px')};
  border-radius: 3px;
`;

export default Button;
