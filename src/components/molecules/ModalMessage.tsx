import * as React from 'react';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import styled from 'styled-components';
import Anhore from '../atoms/Anhore';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import ErrorMsg from '../atoms/ErrorMsg';
import Header from '../atoms/Header';
import TextAreaField from '../atoms/TextAreaField';
import TextInputField from '../atoms/TextInputField';

const MessageWrapper = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  button {
    align-self: flex-end;
  }
`;

const MessageHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px;
`;

const RodoWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ModalMessage = () => {
  const [newMessage, setNewMessage] = React.useState({
    eMail: '',
    phone: '',
    message: '',
    rodo: false,
  });

  const { eMail, phone, message, rodo } = newMessage;
  const { register, handleSubmit, setValue, errors } = useForm();

  const changeHandler = (value: string | boolean, name: string): void => {
    setNewMessage((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = handleSubmit((cred) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(cred));
  });

  return (
    <MessageWrapper onSubmit={onSubmit}>
      <MessageHeader>Napisz do nas wiadomość</MessageHeader>
      <TextInputField
        name="eMail"
        placeholder="E-MAIL"
        value={eMail}
        onChange={({ target }) => changeHandler(target.value, target.name)}
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
        onChange={({ target }) => changeHandler(target.value, target.name)}
        ref={register({ required: true })}
      />
      {errors.phone && (
        <ErrorMsg>
          Prosze podać tylko liczby <BsExclamationCircle />
        </ErrorMsg>
      )}
      <TextAreaField
        name="message"
        placeholder="Wiadomość"
        value={message}
        onChange={({ target }) => changeHandler(target.value, target.name)}
        ref={register({ required: true })}
      />
      {errors.message && (
        <ErrorMsg>
          Pole nie moze byc puste <BsExclamationCircle />
        </ErrorMsg>
      )}
      <RodoWrapper>
        <Checkbox checked={rodo} className="checkbox" name="rodo" changeHandler={changeHandler} />
        <Anhore
          small
          href="http://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
          target="_blank"
        >
          Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych
        </Anhore>
      </RodoWrapper>
      <Button
        role="button"
        onClick={() => {
          setValue('eMail', eMail);
          setValue('phone', phone);
          setValue('message', message);
        }}
        disabled={!rodo}
      >
        Wyślij
      </Button>
    </MessageWrapper>
  );
};

export default ModalMessage;
