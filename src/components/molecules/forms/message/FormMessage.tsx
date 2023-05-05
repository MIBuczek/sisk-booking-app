import {IMessageForm} from 'models';
import * as React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {BsExclamationCircle} from 'react-icons/bs';
import {useDispatch} from 'react-redux';
import {closeModal} from 'store';
import styled from 'styled-components';
import {
   sendEmailNotification,
   USER_MIB_ID,
   USER_MIB_SERVICE_ID,
   USER_MIB_TEMPLATE_MESSAGE_ID
} from 'utils';
import Anchor from 'components/atoms/Anchor';
import Button from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import TextAreaField from 'components/atoms/TextAreaField';
import TextInputField from 'components/atoms/TextInputField';
import ConfirmAction from 'components/molecules/ConfirmAction';

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

const ErrorServer = styled.span`
   color: ${({theme}) => theme.error};
   font-weight: 600;
   display: flex;
   font-size: 14px;
   align-items: center;
   letter-spacing: -0.5px;
   width: 100%;
   padding: 10px 40px;

   svg {
      height: 20px;
      width: 15px;
      margin-left: 3px;
   }
`;

/**
 * Form message component.
 * It's handle user messages for app administrators.
 *
 * @returns {JSX.Element}
 */
const FormMessage = (): JSX.Element => {
   const [message, setMessage] = React.useState<IMessageForm | undefined>();
   const [police, setPolice] = React.useState<boolean>(false);
   const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
   const [error, setError] = React.useState(false);

   const dispatch = useDispatch();
   const {
      control,
      handleSubmit,
      formState: {errors},
      getValues
   } = useForm<IMessageForm>();

   /**
    * Function to submit actual form values into form message state.
    * It will be dispatched to database it user confirm action.
    * @param cred
    */
   const onSubmit: SubmitHandler<IMessageForm> = (cred) => {
      setMessage({...cred});
      setDisplayConfirmation(true);
   };

   /**
    * Function to confirm dispatch action. If so then sent notification to pointed email address.
    */
   const confirmSubmit = async (): Promise<void> => {
      const status = await sendEmailNotification(
         USER_MIB_SERVICE_ID,
         USER_MIB_TEMPLATE_MESSAGE_ID,
         message,
         USER_MIB_ID
      );
      if (status > 200) {
         setError(true);
      } else {
         initialState();
         setError(false);
      }
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
      <MessageWrapper>
         <MessageHeader>Skontaktuj się z nami</MessageHeader>
         {error && (
            <ErrorServer>
               Nie udało sie wysłać wiadomość. Problem z serwerem
               <BsExclamationCircle />
            </ErrorServer>
         )}
         <MessageContent>
            <Label>Imię i nazwisko</Label>
            <Controller
               name="person"
               defaultValue={''}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  },
                  minLength: {
                     value: 3,
                     message: 'Minimalna ilość znaków to 3'
                  },
                  maxLength: {
                     value: 100,
                     message: 'Maksymalna ilość znaków to 100'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
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
            {errors.person && <ErrorMsg innerText={errors.person.message} />}
            <Label>E-mail</Label>
            <Controller
               name="email"
               defaultValue={''}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  },
                  minLength: {
                     value: 8,
                     message: 'Minimalna ilość znaków to 8'
                  },
                  maxLength: {
                     value: 100,
                     message: 'Maksymalna ilość znaków to 100'
                  },
                  validate: () => getValues('email').includes('@') || 'Adres email musi zawierać @'
               }}
               render={({field: {onChange, onBlur, value}}) => (
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
            {errors.email && <ErrorMsg innerText={errors.email.message} />}
            <Label>Telefon</Label>
            <Controller
               name="phone"
               defaultValue={''}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  },
                  minLength: {
                     value: 9,
                     message: 'Minimalna ilość znaków to 9'
                  },
                  maxLength: {
                     value: 15,
                     message: 'Maksymalna ilość znaków to 15'
                  },
                  pattern: {
                     value: /^[\d./-]+$/,
                     message: 'Pole może zawierać tylko liczby oraz myślnik'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
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
            {errors.phone && <ErrorMsg innerText={errors.phone.message} />}
            <Label>Wiadomość</Label>
            <Controller
               name="message"
               defaultValue={''}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  },
                  minLength: {
                     value: 3,
                     message: 'Minimalna ilość znaków to 3'
                  },
                  maxLength: {
                     value: 600,
                     message: 'Maksymalna ilość znaków to 600'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
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
            {errors.message && <ErrorMsg innerText={errors.message.message} />}
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
                  href="https://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
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
               <Button onClick={handleSubmit(onSubmit)} disabled={!police}>
                  Wyślij
               </Button>
            </ButtonPanel>
         )}
      </MessageWrapper>
   );
};

export default FormMessage;
