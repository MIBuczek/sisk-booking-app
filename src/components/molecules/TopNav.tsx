import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../atoms/Logo';

const NavWrapper = styled.nav`
  width: 100%;
  height: 120px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 60px;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavigationLink = styled(NavLink)`
  color: ${({ theme }) => theme.darkColor};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px;
`;
const active = { borderBottom: '2px solid #454545' };

const TopNav = (): JSX.Element => (
  <NavWrapper>
    <Logo />
    <StyledLinksList>
      <NavigationLink to="/main" activeStyle={active}>
        Strona Główna
      </NavigationLink>
      <NavigationLink to="/calender">Kalendarz Rezerwacji</NavigationLink>
      <NavigationLink to="/contacts">Kontakt</NavigationLink>
    </StyledLinksList>
  </NavWrapper>
);

export default TopNav;
