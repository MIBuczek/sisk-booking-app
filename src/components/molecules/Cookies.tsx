import * as React from 'react';
import styled from 'styled-components';
import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import Header from '../atoms/Header';
import Paragraph from '../atoms/Paragraph';

const CookiesWrapper = styled.div`
   position: fixed;
   right: 20px;
   bottom: 6%;
   box-shadow: 0 3px 9px 0 rgb(0 0 0 / 40%);
   box-sizing: border-box;
   z-index: 100;
   width: 260px;
   height: auto;
   color: ${({ theme }) => theme.white};
   padding: 15px 20px;
   border-radius: 3px;
   background-color: white;
`;

const CookieHeader = styled(Header)`
   font-size: 24px;
   text-transform: none;
   text-align: left;
   font-weight: 400;
   margin-top: 5px;
   margin-bottom: 0;
   &:after {
      position: static;
   }
`;

const CookieParagraph = styled(Paragraph)`
   color: ${({ theme }) => theme.darkGrey};
   font-size: 14px;
   font-weight: 400;
   padding-top: 0;
   margin: 0;
   text-align: left;
   a {
      padding-top: 0;
      line-height: 1.4;
      text-decoration: underline;
   }
`;

const Cookies = () => {
  const [showInfo, setShowInfo] = React.useState(true);

  /**
    * Function to set local storage if user accept cookies politic.
    */
  const setLocalStorage = () => {
    localStorage.setItem('cookies', 'false');
    setShowInfo(false);
  };

  /**
    * Function to get local storage and check if current user accept cookies politic.
    */
  const getLocalStorage = () => {
    const userCookies: string | null = localStorage.getItem('cookies');
    if (!userCookies) setShowInfo(true);
    else setShowInfo(false);
  };

  React.useEffect(() => {
    getLocalStorage();
    return () => {
      setShowInfo(true);
    };
  }, []);
  if (!showInfo) return null;
  return (
      <CookiesWrapper>
         <CookieHeader>Pliki Cookies</CookieHeader>
         <CookieParagraph>
            Serwis wykorzystuje pliki cookies. Korzystając ze strony wyrażasz zgodę na
            wykorzystywanie plików cookies.
            <Anchor target="_blank" href="https://www.sisk-siechnice.pl/polityka-prywatnosci/">
               Dowiedz się więcej.
            </Anchor>
         </CookieParagraph>
         <Button role="button" onClick={setLocalStorage}>
            Ok, rozumiem
         </Button>
      </CookiesWrapper>
  );
};

export default Cookies;
