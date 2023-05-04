import React from 'react';
import {BsExclamationSquare} from 'react-icons/bs';
import styled from 'styled-components';

import Header from 'components/atoms/Header';
import Paragraph from 'components/atoms/Paragraph';
import RedirectLink from 'components/atoms/RedirectLink';

const NoMatchWrapper = styled.main`
   width: 100%;
   margin-top: 5vh;
   min-height: 46.5vh;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const NoMatchHeader = styled(Header)`
   width: 100%;
`;

const NoMatchContent = styled.section`
   display: flex;
   flex-direction: column;
   max-width: 570px;

   p {
      padding: 0;
   }
`;

/**
 * Not fount page component
 *
 * @returns {JSX.Element} Not fount page
 */
const NoMatch = (): JSX.Element => (
   <NoMatchWrapper>
      <NoMatchContent>
         <NoMatchHeader>
            Strona nie istnieje
            <BsExclamationSquare />
         </NoMatchHeader>
         <Paragraph>Bład 404</Paragraph>
         <RedirectLink to="/">Powrót do kaledarza rezerwacji</RedirectLink>
      </NoMatchContent>
   </NoMatchWrapper>
);

export default NoMatch;
