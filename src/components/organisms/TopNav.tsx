import * as React from 'react';
import { BsEnvelopeFill, BsFillHouseFill, BsPower } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from 'models';
import { logOutUser } from 'store';
import Logo from '../atoms/Logo';
import useScrollPosition from '../../hooks/useScrollPosition ';
import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import { fadeIn } from '../../style/animation';
import { openModal } from '../../store';
import { MODAL_TYPES } from '../../utils';

type Navigation = {
  isTop: boolean;
  isOpen: boolean;
};

const NavWrapper = styled.nav<Navigation>`
  width: 100%;
  min-height: 12vh;
  padding: 22px 60px;
  background: transparent;
  position: static;
  top: 0;
  left: 0;
  z-index: 0;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
  animation: ${fadeIn} 0.5s linear;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 889px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  li {
    display: flex;
    min-width: 100px;
    @media (max-width: 889px) {
      font-size: ${({ theme }) => theme.fontSize.m};
      text-align: center;
      margin-top: 20px;
    }
  }
`;

const NavigationLink = styled(NavLink)`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.ml};
  font-weight: ${({ theme }) => theme.bold};
  line-height: 1.5;
  text-decoration: none;
  text-transform: uppercase;
  padding: 16px 10px 17px 10px;
  transition: 0.4s;
  &:hover {
    color: ${({ theme }) => theme.green};
  }
  @media (max-width: 889px) {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const NavButton = styled(Button)`
  color: ${({ theme }) => theme.darkGrey};
  background: transparent;
  font-size: 1.9rem;
  border: none;
  margin: 0;
  padding: 16px 10px 17px 10px;
  display: inline-flex;
  &.btn {
    color: ${({ theme }) => theme.green};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.ml};
    text-transform: uppercase;
    padding: 5px 10px;
    border: 1px solid;
    &:hover {
      box-shadow: 0 0 17px -7px rgba(66, 68, 90, 1);
    }
  }
  &:hover {
    box-shadow: none;
    color: ${({ theme }) => theme.green};
  }
  svg {
    display: block;
    margin-left: 10px;
  }
`;

const NaviAnchor = styled(Anchor)`
  background: transparent;
  font-size: 1.9rem;
  padding: 16px 10px 17px 10px;
  &:hover {
    color: #afbf36;
  }
  svg {
    display: block;
  }
  @media (max-width: 889px) {
    padding: 5px 10px;
  }
`;

const active = { color: '#AFBF36' };

const TopNav = (): JSX.Element => {
  const [isTop, setIsTop] = React.useState<boolean>(true);

  const dispatch = useDispatch();

  const {
    authStore,
    currentUserStore: { user },
    modal: { isOpen }
  } = useSelector((store: IReduxState): IReduxState => store);

  const scrollPosition = useScrollPosition();

  /**
   * Condition to check if we on top of the page.
   */
  if (scrollPosition > 30 && isTop && !isOpen) setIsTop(false);
  else if (scrollPosition < 30 && !isTop) setIsTop(true);

  return (
    <NavWrapper isTop={isTop} isOpen={isOpen}>
      <NavContent>
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
            <NavButton role="button" onClick={() => dispatch(openModal(MODAL_TYPES.MESSAGE))}>
              <BsEnvelopeFill />
            </NavButton>
            <NaviAnchor href="https://www.sisk-siechnice.pl/" target="_blank">
              <BsFillHouseFill />
            </NaviAnchor>
          </li>
          {authStore.auth && (
            <li>
              <NavButton role="button" className="btn" onClick={() => dispatch(logOutUser())}>
                {user?.name}
                <BsPower />
              </NavButton>
            </li>
          )}
        </StyledLinksList>
      </NavContent>
    </NavWrapper>
  );
};

export default TopNav;
