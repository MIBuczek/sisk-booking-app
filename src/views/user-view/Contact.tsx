import * as React from 'react';
import { BsEnvelope, BsPhone, BsHouseDoor } from 'react-icons/bs';
import styled from 'styled-components';
import Anhore, { iconeNormal } from '../../components/atoms/Anhore';
import Header from '../../components/atoms/Header';
import Paragraph from '../../components/atoms/Paragrahp';

const ContactWrapper = styled.main`
  width: 100%;
  max-width: 1470px;
  min-height: 78vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const ContactHeader = styled(Header)`
  margin-bottom: 40px;
  &:after {
    position: absolute;
    bottom: -14px;
    left: 0;
    content: '';
    border-bottom: 5px solid #afbf36;
    width: 110px;
  }
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
      <ContactHeader>DANE TELEADRESOWE</ContactHeader>
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
      <ContactHeader>Biuro / Adres korespondencyjny</ContactHeader>
      <Paragraph>
        ul. Księżnej Anny z Przemyślidów 6a,
        <br />
        55-011 Siechnice
      </Paragraph>
      <Anhore href="tel:+48718890023">
        <BsEnvelope style={iconeNormal} />
        tel. 71 889 00 23
      </Anhore>
      <Anhore href="biuro@sisk-siechnice.pl">
        <BsPhone style={iconeNormal} />
        www.sisk-siechnice.pl
      </Anhore>
      <Anhore href="www.sisk-siechnice.pl">
        <BsHouseDoor style={iconeNormal} />
        tel. 71 889 00 23
      </Anhore>
    </ContactInfo>
  </ContactWrapper>
);

export default Contact;
