import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import BIP from '../../assets/images/bip.png';

const NavWrapper = styled.nav`
  width: 100%;
  min-height: 13vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  background: white;
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
const BIPImage = styled.img`
  margin-left: 10rem;
  max-width: 100%;
  height: auto;
`;
const active = { color: '#AFBF36' };

const TopNav = (): JSX.Element => (
  <NavWrapper>
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
      <li>
        <BIPImage src={BIP} />
      </li>
    </StyledLinksList>
  </NavWrapper>
);

export default TopNav;
