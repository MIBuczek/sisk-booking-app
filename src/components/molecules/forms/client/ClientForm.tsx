import * as React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, {customStyles, SelectWrapper} from 'components/atoms/SelectInputField';
import TextInputField from 'components/atoms/TextInputField';
import {CLIENT_INITIAL_VALUE, CLIENT_OPTIONS, CLIENT_TYPE, findSelectedOption} from 'utils';
import {useDispatch} from 'react-redux';
import {IClient, IClientForm} from 'models';
import {addClient, closeModal, updateClient} from 'store';
import ConfirmAction from 'components/molecules/ConfirmAction';
import {cloneDeep} from 'lodash';

const ClientWrapper = styled.section`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   padding-top: 20px;
   max-width: 800px;
   @media (max-width: 890px) {
      width: 90%;
   }
`;

const ClientSubHeader = styled(Header)`
   font-size: ${({theme}) => theme.fontSize.l};
   width: 85%;
   margin: 15px 0 25px;
`;

const ClientInnerContent = styled.article`
   width: 50%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   padding: 0 40px 20px 20px;

   &:first-of-type {
      border-right: ${({theme}) => `1px solid ${theme.green}`};
      @media (max-width: 890px) {
         border-right-color: transparent;
      }
   }

   @media (max-width: 890px) {
      width: 100%;
      border-right-color: transparent;
   }
`;

const ClientSelectWrapper = styled(SelectWrapper)`
   margin-top: 0;
`;

const ButtonPanel = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   width: 85%;
   margin: 3rem 0;

   button {
      margin: 0 0 0 0.8rem;
   }
`;

interface IProps {
   isEditing: boolean;
   editedItemIndex?: number;
   initialEditingState: () => void;
   clientList: IClient[];
}

/**
 * Client Form Component.
 * Add / Edit client data.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ClientForm: React.FunctionComponent<IProps> = ({
   isEditing,
   editedItemIndex,
   initialEditingState,
   clientList
}): JSX.Element => {
   const [clientData, setClientData] = React.useState<IClient | undefined>(undefined);
   const [clientId, setClientId] = React.useState<string | undefined>(undefined);
   const [displayConfirmation, setDisplayConfirmation] = React.useState(false);

   const dispatch = useDispatch();
   const {
      handleSubmit,
      formState: {errors},
      getValues,
      control,
      reset,
      watch
   } = useForm<IClientForm>({defaultValues: cloneDeep(CLIENT_INITIAL_VALUE)});

   const {type: clientType} = watch();

   React.useEffect(() => {
      if (isEditing && typeof editedItemIndex === 'number') {
         editClientHandler(editedItemIndex);
      } else {
         createInitialState();
      }
   }, [isEditing]);

   /**
    * Function to submit actual form values into form state.
    * It will be dispatched to database it user confirm action.
    * @param cred
    */
   const onSubmit: SubmitHandler<IClientForm> = (cred) => {
      setClientData({
         ...cred,
         nip: cred.nip || '',
         contactPerson: cred.contactPerson || '',
         type: cred.type.value
      } as IClient);
      setDisplayConfirmation(true);
   };

   /**
    * Function to confirm dispatch action. If so then add or update firebase clients collection.
    */
   const confirmSubmit = () => {
      if (!clientData) return;
      if (clientId) {
         dispatch(updateClient({...clientData, id: clientId}));
      } else dispatch(addClient(clientData));

      createInitialState();
      dispatch(closeModal());
   };

   /**
    * Function handle edit selected client object. It set form fields with current client data.
    * @param index
    */
   const editClientHandler = (index: number) => {
      const currentClient = clientList[index];
      reset({...currentClient, type: findSelectedOption(currentClient.type, CLIENT_OPTIONS)});
      setClientId(currentClient.id);
   };

   /**
    * Function to restore initial status.
    */
   const createInitialState = () => {
      reset(CLIENT_INITIAL_VALUE);
      setClientId(undefined);
      setClientData(undefined);
      initialEditingState();
      setDisplayConfirmation(false);
   };

   /**
    * Function handle cancel action.
    */
   const cancelHandler = () => {
      createInitialState();
      dispatch(closeModal());
   };

   return (
      <ClientWrapper>
         <ClientSubHeader>
            {isEditing ? 'Edytuj istniejeacego najemcę' : 'Dodaj nowego najemcę'}
         </ClientSubHeader>
         <ClientInnerContent>
            <ClientSelectWrapper>
               <Label>Typ klienta</Label>
               <Controller
                  name="type"
                  defaultValue={CLIENT_OPTIONS[0]}
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: 'Pole nie może być puste'
                     }
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                     <SelectInputField
                        options={CLIENT_OPTIONS}
                        styles={customStyles(!!errors.type)}
                        placeholder="Wybierz"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        defaultValue={CLIENT_OPTIONS[0]}
                        isDisabled={displayConfirmation}
                        blurInputOnSelect
                        isSearchable={false}
                     />
                  )}
               />
               {errors.type && <ErrorMsg innerText={errors.type.message} />}
            </ClientSelectWrapper>
            <Label>
               {clientType?.value === CLIENT_TYPE.COMPANY ? 'Nazwa firmy' : 'Imię i nazwisko'}
            </Label>
            <Controller
               name="name"
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
                     invalid={!!errors.name}
                     className="input"
                     placeholder="Wpisz"
                     disabled={displayConfirmation}
                  />
               )}
            />
            {errors.name && <ErrorMsg innerText={errors.name.message} />}
            {clientType?.value === CLIENT_TYPE.COMPANY && (
               <>
                  <Label>NIP</Label>
                  <Controller
                     name="nip"
                     defaultValue={''}
                     control={control}
                     rules={{
                        required: {
                           value: true,
                           message: 'Pole nie może być puste'
                        },
                        minLength: {
                           value: 10,
                           message: 'Minimalna ilość znaków to 10'
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
                           invalid={!!errors.nip}
                           className="input"
                           placeholder="Wpisz"
                           disabled={displayConfirmation}
                        />
                     )}
                  />
                  {errors.nip && <ErrorMsg innerText={errors.nip.message} />}
               </>
            )}
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
                     value: /^[0-9\s-]+$/,
                     message: 'Pole może zawierać tylko liczby,myślnik lub spacje'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <TextInputField
                     onBlur={onBlur}
                     value={value}
                     onChange={onChange}
                     invalid={!!errors.phone}
                     className="input"
                     placeholder="Wpisz"
                     disabled={displayConfirmation}
                  />
               )}
            />
            {errors.phone && <ErrorMsg innerText={errors.phone.message} />}
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
         </ClientInnerContent>
         <ClientInnerContent>
            {clientType?.value === CLIENT_TYPE.COMPANY && (
               <>
                  <Label>Osoba kontaktowa</Label>
                  <Controller
                     name="contactPerson"
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
                           invalid={!!errors.contactPerson}
                           className="input"
                           placeholder="Wpisz"
                           disabled={displayConfirmation}
                        />
                     )}
                  />
                  {errors.contactPerson && <ErrorMsg innerText={errors.contactPerson.message} />}
               </>
            )}
            <Label>Ulica</Label>
            <Controller
               name="street"
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
                     invalid={!!errors.street}
                     className="input"
                     placeholder="Wpisz"
                     disabled={displayConfirmation}
                  />
               )}
            />
            {errors.street && <ErrorMsg innerText={errors.street.message} />}
            <Label>Miasto</Label>
            <Controller
               name="city"
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
                     invalid={!!errors.city}
                     className="input"
                     placeholder="Wpisz"
                     disabled={displayConfirmation}
                  />
               )}
            />
            {errors.city && <ErrorMsg innerText={errors.city.message} />}
            <Label>Kod pocztowy</Label>
            <Controller
               name="zipCode"
               defaultValue={''}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  },
                  minLength: {
                     value: 3,
                     message: 'Minimalna ilość znaków to 5'
                  },
                  maxLength: {
                     value: 100,
                     message: 'Maksymalna ilość znaków to 8'
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
                     invalid={!!errors.zipCode}
                     className="input"
                     placeholder="Wpisz"
                     disabled={displayConfirmation}
                  />
               )}
            />
            {errors.zipCode && <ErrorMsg innerText={errors.zipCode.message} />}
            <Label>Nick</Label>
            <Controller
               name="nick"
               defaultValue={''}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  },
                  minLength: {
                     value: 3,
                     message: 'Minimalna ilość znaków to 5'
                  },
                  maxLength: {
                     value: 100,
                     message: 'Maksymalna ilość znaków to 8'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <TextInputField
                     onBlur={onBlur}
                     value={value}
                     onChange={onChange}
                     invalid={!!errors.nick}
                     className="input"
                     placeholder="Wpisz"
                     disabled={displayConfirmation}
                  />
               )}
            />
            {errors.nick && <ErrorMsg innerText={errors.nick.message} />}
         </ClientInnerContent>
         {displayConfirmation ? (
            <ConfirmAction
               message="Czy napewno chcesz dodac nowego klienta do bazy"
               callback={confirmSubmit}
               cancelCallback={() => setDisplayConfirmation(false)}
            />
         ) : (
            <ButtonPanel>
               <Button secondary onClick={cancelHandler}>
                  Anuluj
               </Button>
               <Button onClick={handleSubmit(onSubmit)}>{isEditing ? 'Zapisz' : 'Dodaj'}</Button>
            </ButtonPanel>
         )}
      </ClientWrapper>
   );
};

export default ClientForm;
