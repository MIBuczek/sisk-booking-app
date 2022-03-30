import { IMessageForm } from 'models';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeModal } from 'store';
import styled from 'styled-components';
import Anchor from '../../atoms/Anchor';
import Button from '../../atoms/Button';
import Checkbox from '../../atoms/Checkbox';
import ErrorMsg from '../../atoms/ErrorMsg';
import Header from '../../atoms/Header';
import Label from '../../atoms/Label';
import TextAreaField from '../../atoms/TextAreaField';
import TextInputField from '../../atoms/TextInputField';
import ConfirmAction from '../ConfirmAction';

const MessageWrapper = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  button {
    align-self: flex-end;
  }
  @media (max-width: 890px) {
    min-width: 300px;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  @media (max-width: 890px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const MessageHeader = styled(Header)`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  flex-wrap: wrap;
  &:after {
    left: 40px;
  }
  @media (max-width: 890px) {
    padding: 10px 40px;
  }
`;

const RodoWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: 3rem 0;
  padding: 0 20px;
  button {
    margin: 0 0 0 0.8rem;
  }
`;

const FormMessage = () => {
  const [message, setMessage] = React.useState<IMessageForm | undefined>();
  const [police, setPolice] = React.useState<boolean>(false);
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);

  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm();

  /**
   * Function to submit actual form values into form message state.
   * It will be dispatched to database it user confirm action.
   * @param cred
   */
  const onSubmit = handleSubmit<IMessageForm>((cred): void => {
    setMessage({ ...cred });
    setDisplayConfirmation(true);
  });

  /**
   * Function to confirm dispatch action. If so then sent notification to pointed email address.
   */
  const confirmSubmit = (): void => {
    alert(JSON.stringify(message));
    initialState();
  };

  /**
   * Function to restore initial status.
   */
  const initialState = (): void => {
    setMessage(undefined);
    setPolice(false);
    setDisplayConfirmation(false);
    dispatch(closeModal());
  };

  return (
    <MessageWrapper onSubmit={onSubmit}>
      <MessageHeader>Skontaktuj się z nami</MessageHeader>
      <MessageContent>
        <Label>Imię i nazwisko</Label>
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.person && <ErrorMsg innerText="Pole nie może być puste" />}
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
              placeholder="Wpisz"
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.email && <ErrorMsg innerText="Pole nie może być puste" />}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.phone && <ErrorMsg innerText="Pole nie może być puste" />}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.message && <ErrorMsg innerText="Pole nie może być puste" />}
        <RodoWrapper>
          <Checkbox
            checked={police}
            className="checkbox"
            name="police"
            disabled={displayConfirmation}
            changeHandler={() => setPolice(displayConfirmation ? police : !police)}
          />
          <Anchor
            small
            href="http://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
            target="_blank"
          >
            Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych.
          </Anchor>
        </RodoWrapper>
      </MessageContent>
      {displayConfirmation ? (
        <ConfirmAction
          message="Czy napewno chcesz wysłać wiadomość"
          callback={confirmSubmit}
          cancelCallback={() => setDisplayConfirmation(false)}
        />
      ) : (
        <ButtonPanel>
          <Button secondary onClick={initialState}>
            Anuluj
          </Button>
          <Button onClick={onSubmit} disabled={!police}>
            Wyślij
          </Button>
        </ButtonPanel>
      )}
    </MessageWrapper>
  );
};

export default FormMessage;
