import styled from 'styled-components';

export interface HeaderProps {
  text: string;
}

const Header = styled.h1`
  line-height: 1.2;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 500;
  text-transform: uppercase;
  position: relative;
  line-height: 1.5;
`;

export default Header;
