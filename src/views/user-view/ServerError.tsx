import React from 'react';
import { BsEnvelope, BsExclamationSquare } from 'react-icons/bs';
import styled from 'styled-components';

import Anchor, { iconNormal } from 'components/atoms/Anchor';
import Header from 'components/atoms/Header';
import Paragraph from 'components/atoms/Paragraph';

const ServerErrorWrapper = styled.main`
  width: 100%;
  min-height: 73vh;
  margin-top: 14vh;
`;

const ServerErrorContent = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: rowe;
  flex-wrap: wrap;
  max-width: 630px;
  a {
    margin-right: 2rem;
  }
`;

const ServerError = () => (
  <ServerErrorWrapper>
    <ServerErrorContent>
      <Header>
        Mamy obecnie problem z serverem
        <BsExclamationSquare />
      </Header>
      <Paragraph>Zapraszamy do kontaktu telefonicznego lub napisz do nas wiadomos</Paragraph>
      <Anchor href="tel:+48718890023">
        <BsEnvelope style={iconNormal} />
        tel. 71 889 00 23
      </Anchor>
      <Anchor href="biuro@sisk-siechnice.pl">
        <BsEnvelope style={iconNormal} />
        biuro@sisk-siechnice.pl
      </Anchor>
    </ServerErrorContent>
  </ServerErrorWrapper>
);

export default ServerError;
