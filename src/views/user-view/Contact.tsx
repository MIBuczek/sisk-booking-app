import * as React from 'react';
import { useForm } from 'react-hook-form';
import { BsEnvelope, BsExclamationCircle, BsPhone, BsHouseDoor } from 'react-icons/bs';
import styled from 'styled-components';
import Button from '../../components/atoms/Button';
import Anhore, { iconeNormal } from '../../components/atoms/Anhore';
import ErrorMsg from '../../components/atoms/ErrorMsg';
import Header from '../../components/atoms/Header';
import Paragraph from '../../components/atoms/Paragrahp';
import TextAreaField from '../../components/atoms/TextAreaField';
import TextInputField from '../../components/atoms/TextInputField';

const ContactWrapper = styled.main`
  width: 100%;
  min-height: 82vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const ContactForm = styled.section`
  padding: 20px 40px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  button {
    align-self: flex-end;
    margin-right: 18px;
  }
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
  padding: 20px 40px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    &:nth-of-type(2) {
      margin-top: 40px;
    }
  }
`;

const Contact = () => {
  const [newMessage, setNewMessage] = React.useState({
    eMail: '',
    phone: '',
    message: '',
  });
  const { eMail, phone, message } = newMessage;
  const { register, handleSubmit, setValue, errors } = useForm();

  const onSubmit = handleSubmit((cred) => {
    console.log(cred);
  });

  return (
    <ContactWrapper>
      <ContactForm>
        <ContactHeader>FORMULARZ KONTAKTOWY</ContactHeader>
        <TextInputField
          name="eMail"
          placeholder="E-MAIL"
          value={eMail}
          onChange={({ target }) =>
            setNewMessage((prev) => ({ ...prev, [target.name]: target.value }))
          }
          ref={register({ required: true })}
        />
        {errors.eMail && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <TextInputField
          name="phone"
          placeholder="Telefon"
          value={phone}
          onChange={({ target }) =>
            setNewMessage((prev) => ({ ...prev, [target.name]: target.value }))
          }
          ref={register({ required: false })}
        />
        {errors.eMail && (
          <ErrorMsg>
            Prosze podać tylko liczby <BsExclamationCircle />
          </ErrorMsg>
        )}
        <TextAreaField
          name="message"
          placeholder="Wiadomość"
          value={message}
          onChange={({ target }) =>
            setNewMessage((prev) => ({ ...prev, [target.name]: target.value }))
          }
          ref={register({ required: false })}
        />
        {errors.eMail && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Anhore
          small
          href="http://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
          target="_blank"
        >
          Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych
        </Anhore>
        <Button
          primary
          role="button"
          onClick={() => {
            setValue('eMail', eMail);
            setValue('phone', phone);
            setValue('message', message);
          }}
          disabled={false}
          // size="SMALL"
        >
          Wyślij
        </Button>
      </ContactForm>
      <ContactInfo>
        <ContactHeader>DANE TELEADRESOWE</ContactHeader>
        <Paragraph bold>Siechnicka Inwestycyjna Spółka Komunalna sp. z o.o.</Paragraph>
        <Paragraph>ul. Jana Pawła || 12 55-011 Siechnice</Paragraph>
        <br />
        <Paragraph bold small>
          Godziny przyjęć interesantów:
        </Paragraph>
        <Paragraph small>poniedziałek: 08:00 - 14:00</Paragraph>
        <Paragraph small>wtorek: 08 - 14:00</Paragraph>
        <Paragraph small>środa: 08 - 14:00</Paragraph>
        <Paragraph small>czwartek: 08:00 - 16:00</Paragraph>
        <Paragraph small>piątek: 8:00 - 14:00</Paragraph>
        <ContactHeader>Biuro / Adres korespondencyjny</ContactHeader>
        <Paragraph>ul. Księżnej Anny z Przemyślidów 6a,</Paragraph>
        <Paragraph>55-011 Siechnice</Paragraph>
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
};

export default Contact;
