import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/atoms/Header';
import RedirectLink from '../../components/atoms/RedirectLinkt';

const NoMatchWrapper = styled.section`
  width: 100%;
  max-width: 1470px;
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ErrorHeader = styled(Header)`
  color: ${({ theme }) => theme.error};
`;

const NoMatch: React.SFC = (): JSX.Element => (
  <NoMatchWrapper>
    <ErrorHeader>Bład 404</ErrorHeader>
    <Header>Strona nie istnieje</Header>
    <RedirectLink to="/">Powrót do kaledarza rezerwacji</RedirectLink>
  </NoMatchWrapper>
);

export default NoMatch;
