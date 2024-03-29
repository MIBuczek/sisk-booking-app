import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {IReduxState} from 'models';
import ModalMessage from 'components/molecules/modals/ModalMessage';
import {fadeIn} from 'style/animation';
import {MODAL_TYPES} from 'utils';
import {openModal} from 'store';
import logoFooter from 'assets/images/logo_footer.png';
import BIPFooter from 'assets/images/bip-footer.png';
import Paragraph from 'components/atoms/Paragraph';
import Anchor from 'components/atoms/Anchor';
import Button from 'components/atoms/Button';
import Modal from 'components/organisms/Modal';

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
   animation: ${fadeIn} 0.5s linear;
`;

const FooterContent = styled.section`
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
   width: 100%;
   max-width: 1470px;
   padding: 20px 0;
   @media (max-width: 890px) {
      flex-direction: column;
      align-items: center;
   }
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

   @media (max-width: 890px) {
      flex-direction: column;
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
      @media (max-width: 890px) {
         width: 80%;
         padding: 20px 0;
         border-right: none;
         justify-content: center;
      }
   }

   &:last-of-type {
      @media (max-width: 890px) {
         justify-content: space-around;
         align-items: center;
      }
   }

   img {
      &:first-of-type {
         max-width: 250px;
         height: auto;
         padding: 10px 0;
      }

      &:last-of-type {
         width: 95%;
         max-width: 120px;
      }

      @media (max-width: 890px) {
         max-width: 150px;
         padding: 20px;
      }
   }

   @media (max-width: 890px) {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 95%;
   }
`;

const FooterButton = styled(Button)`
   background: transparent;
   margin-top: 30px;
   text-align: left;
   padding: 0;
   border: none;
   width: 150px;
   color: white;

   &:hover {
      text-decoration: underline;
      box-shadow: none;
      opacity: 1;
   }

   @media (max-width: 890px) {
      margin: 5px 10px;
      width: auto;
      text-align: center;
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

   @media (max-width: 890px) {
      margin: 5px 10px;
   }
`;

const FooterParagraph = styled(Paragraph)`
   color: white;
   line-height: 1.6em;
   text-align: left;
   @media (max-width: 890px) {
      margin: 5px 10px;
   }
`;

const FooterAnchor = styled(Anchor)`
   color: white;
   line-height: 1.6em;
   padding-top: 0;
`;

const AppInfo = styled.div`
   width: 100%;
   height: 2vh;
   background: ${({theme}) => theme.lightGray};
   display: flex;
   align-items: center;
   justify-content: end;
   padding: 0 40px;

   span {
      font-size: 10px;
   }
`;

/**
 * General footer component.
 *
 * @returns {JSX.Element}
 */
const Footer = (): JSX.Element => {
   const dispatch = useDispatch();
   const {isOpen, type} = useSelector((state: IReduxState) => state.modal);

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
                     <FooterAnchor href="tel:+48718890023">tel. 71 889 00 23</FooterAnchor>
                     <FooterAnchor href="biuro@sisk-siechnice.pl">
                        biuro@sisk-siechnice.pl
                     </FooterAnchor>
                     <FooterAnchor href="www.sisk-siechnice.pl">www.sisk-siechnice.pl</FooterAnchor>
                  </FooterParagraph>
               </ContentItem>
               <ContentItem>
                  <FooterLinkItem to="/">Rezerwacje</FooterLinkItem>
                  <FooterLinkItem to="contact">Kontakt</FooterLinkItem>
                  <FooterAnchor href="https://www.sisk-siechnice.pl/">Strona SISK</FooterAnchor>
                  <FooterButton
                     role="button"
                     onClick={() => dispatch(openModal(MODAL_TYPES.MESSAGE))}
                  >
                     Skontaktuj się z nami
                  </FooterButton>
               </ContentItem>
            </FooterContent>
            <FooterCredits>
               <FooterAnchor
                  href="https://www.sisk-siechnice.pl/polityka-prywatnosci"
                  target="_blank"
               >
                  Polityka prywatności
               </FooterAnchor>
               <FooterParagraph small>
                  © Copyright 2018 SISK / Created by
                  <FooterAnchor
                     style={{
                        display: 'inline-block',
                        paddingLeft: '8px',
                        textDecoration: 'underline'
                     }}
                     href="https://gecko-web-services.web.app"
                  >
                     GECKO Web Services
                  </FooterAnchor>
               </FooterParagraph>
            </FooterCredits>
            {isOpen && type === MODAL_TYPES.MESSAGE ? (
               <Modal>
                  <ModalMessage />
               </Modal>
            ) : null}
         </FooterWrapper>
         <AppInfo>
            <span>
               Wersja aplikacji {`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`}
            </span>
         </AppInfo>
      </>
   );
};

export default Footer;
