import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import useScrollPosition from '../../hooks/useScrollPosition ';

type Navigation = {
  isTop: boolean;
};

const NavWrapper = styled.nav<Navigation>`
  width: 100%;
  min-height: 12vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ isTop }) => (isTop ? '22px 60px' : '10px 60px')};
  background: ${({ isTop }) => (isTop ? 'transparent' : 'white')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationLink = styled(NavLink)`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.ml};
  font-weight: ${({ theme }) => theme.ubold};
  line-height: 1.5;
  text-decoration: none;
  text-transform: uppercase;
  padding: 16px 10px 17px 10px;
  transition: 0.4s;
  &:hover {
    color: ${({ theme }) => theme.green};
  }
`;

const active = { color: '#AFBF36' };

const TopNav = (): JSX.Element => {
  const [isTop, setIsTop] = React.useState<boolean>(true);

  const scrollPosition = useScrollPosition();

  if (scrollPosition > 30 && isTop) setIsTop(false);
  else if (scrollPosition < 30 && !isTop) setIsTop(true);

  return (
    <NavWrapper isTop={isTop}>
      <Logo />
      <StyledLinksList>
        <li>
          <NavigationLink to="/" exact activeStyle={active}>
            Kalendarz Rezerwacji
          </NavigationLink>
        </li>
        <li>
          <NavigationLink to="/contact" activeStyle={active}>
            Kontakt
          </NavigationLink>
        </li>
      </StyledLinksList>
    </NavWrapper>
  );
};

export default TopNav;
