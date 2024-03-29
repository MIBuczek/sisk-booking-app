import * as React from 'react';
import styled from 'styled-components';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import TextInputField from 'components/atoms/TextInputField';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Button from 'components/atoms/Button';
import {ICredential} from 'models/auth/credentials-models';
import Label from 'components/atoms/Label';
import {useDispatch, useSelector} from 'react-redux';
import {IReduxState} from 'models';
import {logInUser} from 'store';
import {fadeIn} from 'style/animation';
import ErrorMsgServer from 'components/atoms/ErrorMsgServer';
import {Navigate} from 'react-router-dom';

const LoginWrapper = styled.section`
   width: 100%;
   min-height: 83vh;
   display: grid;
   grid-template-columns: 1fr;
   margin: 0.5rem 0;
   animation: ${fadeIn} 0.5s linear;
   @media (max-width: 890px) {
      min-height: 63vh;
   }
`;

const LoginPanel = styled.form`
   grid-column: 1 / 2;
   grid-row: 1 /2;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const LoginHeader = styled.h3`
   color: ${({theme}) => theme.darkGrey};
   font-size: ${({theme}) => theme.fontSize.m};
   font-weight: ${({theme}) => theme.bold};
   text-transform: uppercase;
   @media (max-width: 890px) {
      padding: 30px 40px;
      text-align: center;
   }
`;

const LoginTextInputs = styled(TextInputField)`
   margin-bottom: 10px;
`;

/**
 * Login panel component
 *
 * @returns {JSX.Element} Login panel
 */
const Login: React.FC = (): JSX.Element => {
   const dispatch = useDispatch();
   const {auth, errorMessage} = useSelector((store: IReduxState) => store.authStore);

   const {
      handleSubmit,
      formState: {errors},
      control,
      getValues
   } = useForm<ICredential>();

   /**
    * Function to dispatch action to log user into platform
    *
    * @param cred
    */
   const onSubmit: SubmitHandler<ICredential> = (cred): void => {
      dispatch(logInUser(cred.email, cred.password));
   };

   if (auth) {
      return <Navigate to={'/admin'} />;
   }

   return (
      <LoginWrapper>
         <LoginPanel>
            <LoginHeader>
               Panel logowania dla administratora kalendarza rezerwacji obiektów
            </LoginHeader>
            <Label>Adres e-mail</Label>
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
                  <LoginTextInputs
                     onBlur={onBlur}
                     value={value}
                     onChange={onChange}
                     invalid={!!errors.email}
                     className="input"
                     placeholder="Wpisz"
                  />
               )}
            />
            {errors.email && <ErrorMsg innerText={errors.email?.message} />}
            <Label>Hasło</Label>
            <Controller
               name="password"
               defaultValue={''}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  },
                  minLength: {
                     value: 5,
                     message: 'Minimalna ilość znaków w haśle to 5'
                  },
                  maxLength: {
                     value: 100,
                     message: 'Maksymalna ilość znaków w haśle to 30'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <LoginTextInputs
                     onBlur={onBlur}
                     value={value}
                     onChange={onChange}
                     invalid={!!errors.password}
                     className="input"
                     placeholder="Wpisz"
                     type="password"
                     autoComplete="on"
                  />
               )}
            />
            {errors.password && <ErrorMsg innerText={errors.password.message} />}
            {errorMessage && <ErrorMsgServer innerText={errorMessage} />}
            <Button role="button" onClick={handleSubmit(onSubmit)} disabled={false}>
               Zaloguj się
            </Button>
         </LoginPanel>
      </LoginWrapper>
   );
};

export default Login;
