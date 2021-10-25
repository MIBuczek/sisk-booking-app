import styled from 'styled-components';

const ButtonIcon = styled.button`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  background: transparent;
  border: none;
  font-family: inherit;
  padding: 10px 20px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: ${({ theme }) => theme.green};
  }
  svg {
    color: inherit;
    width: 2rem;
    height: 2rem;
  }
`;

export const iconStyle = {
  fontSize: '2rem',
  marginRight: '1rem',
  color: 'AFBF36'
};

export default ButtonIcon;
