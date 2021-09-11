import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';
import logoFooter from '../../assets/images/logo_footer.png';
import BIPFooter from '../../assets/images/bip-footer.png';
import Paragraph from '../atoms/Paragrahp';
import Anhore from '../atoms/Anhore';
import Button from '../atoms/Button';
import Modal from './Modal';
import ModalMessage from '../molecules/ModalMessage';

const FooterWrapper = styled.footer`
  width: 100%;
  min-height: 18vh;
  background: #2d441d;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
`;

const FooterContent = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 1470px;
  padding: 20px 0;
`;

const FooterCredits = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1470px;
  height: 60px;
  border-top: 2px solid #57694a;
  a,
  p {
    padding: 0 20px;
  }
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 20%;
  height: auto;
  padding: 0 20px;
  &:first-of-type {
    height: 100%;
  }
  &:nth-of-type(3) {
    border-right: 2px solid #57694a;
    width: 30%;
  }
  img {
    padding: 10px 0;
    &:first-of-type {
      max-width: 250px;
      height: auto;
    }
    &:last-of-type {
      margin-top: 40px;
      max-width: 83px;
      height: auto;
    }
  }
`;
const FooterButton = styled(Button)`
  background: transparent;
  margin-top: 0;
  margin-bottom: 15px;
  text-align: left;
  padding: 0;
  border: none;
  width: 150px;
  &:hover {
    text-decoration: underline;
    box-shadow: none;
    opacity: 1;
  }
`;

const FooterLinkItem = styled(NavLink)`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: white;
  margin-bottom: 15px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterParagraph = styled(Paragraph)`
  color: white;
  line-height: 1.6em;
`;

const FooterAnhore = styled(Anhore)`
  color: white;
  line-height: 1.6em;
  padding-top: 0px;
`;

const Footer = (): JSX.Element => {
  const {
    modal: { isOpen },
    setModal,
  } = useContext(ModalContext);
  return (
    <>
      <FooterWrapper>
        <FooterContent>
          <ContentItem>
            <img src={logoFooter} alt="logo" />
            <img src={BIPFooter} alt="BIP" />
          </ContentItem>
          <ContentItem />
          <ContentItem>
            <FooterParagraph small>
              Siechnicka Inwestycyjna Spółka Komunalna sp. z o.o.
              <br />
              ul. Księżnej Anny z Przemyślidów 6a,
              <br />
              55-011 Siechnice
              <FooterAnhore href="tel:+48718890023">tel. 71 889 00 23</FooterAnhore>
              <FooterAnhore href="biuro@sisk-siechnice.pl">biuro@sisk-siechnice.pl</FooterAnhore>
              <FooterAnhore href="www.sisk-siechnice.pl">www.sisk-siechnice.pl</FooterAnhore>
            </FooterParagraph>
          </ContentItem>
          <ContentItem>
            <FooterLinkItem to="/" exact>
              Rezerwacje
            </FooterLinkItem>
            <FooterLinkItem to="/contact">Kontakt</FooterLinkItem>
            <FooterButton
              role="button"
              onClick={() => setModal({ type: 'MESSAGE', isOpen: true, callback: () => null })}
            >
              Napisz do nas
            </FooterButton>
            <FooterAnhore href="http://www.sisk-siechnice.pl/">Strona SISK</FooterAnhore>
          </ContentItem>
        </FooterContent>
        <FooterCredits>
          <FooterAnhore href="http://www.sisk-siechnice.pl/polityka-prywatnosci" target="_blank">
            Polityka prywatności
          </FooterAnhore>
          <FooterParagraph small>
            © Copyright 2018 SISK / Created by GEKON Web Services
          </FooterParagraph>
        </FooterCredits>
      </FooterWrapper>
      {isOpen && (
        <Modal>
          <ModalMessage />
        </Modal>
      )}
    </>
  );
};

export default Footer;
