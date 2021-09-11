import * as React from 'react';
import { BsEnvelope, BsExclamationSquare } from 'react-icons/bs';
import styled from 'styled-components';
import Anhore, { iconeNormal } from '../../components/atoms/Anhore';
import Header from '../../components/atoms/Header';
import Paragraph from '../../components/atoms/Paragrahp';

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
      <Anhore href="tel:+48718890023">
        <BsEnvelope style={iconeNormal} />
        tel. 71 889 00 23
      </Anhore>
      <Anhore href="biuro@sisk-siechnice.pl">
        <BsEnvelope style={iconeNormal} />
        biuro@sisk-siechnice.pl
      </Anhore>
    </ServerErrorContent>
  </ServerErrorWrapper>
);

export default ServerError;
