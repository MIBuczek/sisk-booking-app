import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Anchor from '../../atoms/Anchor';
import Button from '../../atoms/Button';
import Checkbox from '../../atoms/Checkbox';
import ErrorMsg from '../../atoms/ErrorMsg';
import Header from '../../atoms/Header';
import Label from '../../atoms/Label';
import TextAreaField from '../../atoms/TextAreaField';
import TextInputField from '../../atoms/TextInputField';

const MessageWrapper = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 95vh;
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
  const [police, setPolice] = React.useState<boolean>(false);

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit((cred) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(cred));
  });

  return (
    <MessageWrapper onSubmit={onSubmit}>
      <MessageHeader>Napisz do nas wiadomość</MessageHeader>
      <Label>Imie i nazwisko</Label>
      <Controller
        name="person"
        defaultValue={''}
        control={control}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <TextInputField
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            invalid={!!errors.person}
            className="input"
            placeholder="Wpisz"
          />
        )}
      />
      {errors.person && <ErrorMsg innerText="Pole nie moze byc puste" />}
      <Label>Wpisz swoj adres e-mail</Label>
      <Controller
        name="email"
        defaultValue={''}
        control={control}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <TextInputField
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            invalid={!!errors.email}
            className="input"
            placeholder="E-mail"
          />
        )}
      />
      {errors.email && <ErrorMsg innerText="Pole nie moze byc puste" />}

      <Label>Numer kontaktowy</Label>
      <Controller
        name="phone"
        defaultValue={''}
        control={control}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <TextInputField
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            invalid={!!errors.phone}
            className="input"
            placeholder="000-000-000"
          />
        )}
      />
      {errors.phone && <ErrorMsg innerText="Pole nie moze byc puste" />}
      <Label>Wiadomość</Label>
      <Controller
        name="message"
        defaultValue={''}
        control={control}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <TextAreaField
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            invalid={!!errors.message}
            className="input"
            placeholder="Wiadomość"
          />
        )}
      />
      {errors.message && <ErrorMsg innerText="Pole nie moze byc puste" />}
      <RodoWrapper>
        <Checkbox
          checked={police}
          className="checkbox"
          name="police"
          changeHandler={() => setPolice(!police)}
        />
        <Anchor
          small
          href="http://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
          target="_blank"
        >
          Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych
        </Anchor>
      </RodoWrapper>
      <Button role="button" onClick={onSubmit} disabled={!police}>
        Wyślij
      </Button>
    </MessageWrapper>
  );
};

export default ModalMessage;
