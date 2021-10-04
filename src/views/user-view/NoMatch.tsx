import * as React from 'react';
import { BsExclamationSquare } from 'react-icons/bs';
import styled from 'styled-components';
import Header from '../../components/atoms/Header';
import Paragraph from '../../components/atoms/Paragraph';
import RedirectLink from '../../components/atoms/RedirectLinkt';

const NoMatchWrapper = styled.main`
  width: 100%;
  margin-top: 13vh;
  min-height: 72vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NoMatchContent = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 570px;
  p {
    padding: 0;
  }
`;

const NoMatch: React.SFC = (): JSX.Element => (
  <NoMatchWrapper>
    <NoMatchContent>
      <Header>
        Strona nie istnieje
        <BsExclamationSquare />
      </Header>
      <Paragraph>Bład 404</Paragraph>
      <RedirectLink to="/">Powrót do kaledarza rezerwacji</RedirectLink>
    </NoMatchContent>
  </NoMatchWrapper>
);

export default NoMatch;
