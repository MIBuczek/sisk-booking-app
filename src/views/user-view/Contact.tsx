import React from 'react';
import { BsEnvelope, BsPhone, BsHouseDoor } from 'react-icons/bs';
import { fadeIn } from 'style/animation';
import styled from 'styled-components';

import Anchor, { iconNormal } from 'components/atoms/Anchor';
import Header from 'components/atoms/Header';
import Paragraph from 'components/atoms/Paragraph';

const ContactWrapper = styled.main`
  width: 100%;
  max-width: 1470px;
  margin-top: 5vh;
  min-height: 78vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s linear;
`;

const ContactInfo = styled.section`
  padding: 60px 40px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 890px) {
    padding: 30px 40px;
  }
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
      <Anchor href="tel:+48718890023">
        <BsPhone style={iconNormal} />
        tel. 71 889 00 23
      </Anchor>
      <Anchor href="biuro@sisk-siechnice.pl">
        <BsEnvelope style={iconNormal} />
        biuro@sisk-siechnice.pl
      </Anchor>
      <Anchor href="www.sisk-siechnice.pl">
        <BsHouseDoor style={iconNormal} />
        www.sisk-siechnice.pl
      </Anchor>
    </ContactInfo>
  </ContactWrapper>
);

export default Contact;
