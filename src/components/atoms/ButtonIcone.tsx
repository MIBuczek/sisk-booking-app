import styled from 'styled-components';

const ButtonIcone = styled.button`
  color: ${({ theme }) => theme.darkColor};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  background: transparent;
  border: none;
  font-family: inherit;
  padding: 10px 20px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  margin: 40px 0;
  cursor: pointer;
`;

export const iconeStyle = {
  fontSize: '2rem',
  marginRight: '1rem',
  color: 'AFBF36',
};

export default ButtonIcone;
