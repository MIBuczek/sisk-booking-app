import * as React from 'react';
import { BsEnvelope, BsPhone, BsHouseDoor } from 'react-icons/bs';
import styled from 'styled-components';
import Anhore, { iconeNormal } from '../../components/atoms/Anhore';
import Header from '../../components/atoms/Header';
import Paragraph from '../../components/atoms/Paragrahp';

const ContactWrapper = styled.main`
  width: 100%;
  max-width: 1470px;
  margin-top: 13vh;
  min-height: 78vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ContactInfo = styled.section`
  padding: 60px 40px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Contact = () => (
  <ContactWrapper>
    <ContactInfo>
      <Header>DANE TELEADRESOWE</Header>
      <Paragraph bold>Siechnicka Inwestycyjna Spółka Komunalna sp. z o.o.</Paragraph>
      <Paragraph>ul. Jana Pawła || 12 55-011 Siechnice</Paragraph>
      <br />
      <Paragraph bold small>
        Godziny przyjęć interesantów:
      </Paragraph>
      <Paragraph small>
        poniedziałek: 08:00 - 14:00
        <br />
        wtorek: 08 - 14:00
        <br />
        środa: 08 - 14:00
        <br />
        czwartek: 08:00 - 16:00
        <br />
        piątek: 8:00 - 14:00
      </Paragraph>
    </ContactInfo>
    <ContactInfo>
      <Header>Biuro / Adres korespondencyjny</Header>
      <Paragraph>
        ul. Księżnej Anny z Przemyślidów 6a,
        <br />
        55-011 Siechnice
      </Paragraph>
      <Anhore href="tel:+48718890023">
        <BsPhone style={iconeNormal} />
        tel. 71 889 00 23
      </Anhore>
      <Anhore href="biuro@sisk-siechnice.pl">
        <BsEnvelope style={iconeNormal} />
        biuro@sisk-siechnice.pl
      </Anhore>
      <Anhore href="www.sisk-siechnice.pl">
        <BsHouseDoor style={iconeNormal} />
        www.sisk-siechnice.pl
      </Anhore>
    </ContactInfo>
  </ContactWrapper>
);

export default Contact;
