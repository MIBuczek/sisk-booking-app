import * as React from 'react';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import styled from 'styled-components';
import Button from '../atoms/Button';
import ErrorMsg from '../atoms/ErrorMsg';
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
export interface IProps {}

const ModalMessage: React.FC<IProps> = () => {
  const [newMessage, setNewMessage] = React.useState({
    eMail: '',
    phone: '',
    message: '',
  });
  const { eMail, phone, message } = newMessage;
  const { register, handleSubmit, setValue, errors } = useForm();

  const onSubmit = handleSubmit((cred) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(cred));
  });

  return (
    <MessageWrapper onSubmit={onSubmit}>
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
      <Button
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
    </MessageWrapper>
  );
};

export default ModalMessage;
