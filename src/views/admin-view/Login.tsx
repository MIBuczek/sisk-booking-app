import * as React from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import TextInputField from 'components/atoms/TextInputField';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Button from 'components/atoms/Button';
import { ICredential } from 'models/auth/credentials-models';
import Label from 'components/atoms/Label';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from 'models';
import { logInUser } from 'store';
import { Redirect } from 'react-router';
import { fadeIn } from 'style/animation';

const LoginWrapper = styled.section`
  width: 100%;
  min-height: 83vh;
  margin-top: 5vh;
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
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  text-transform: uppercase;
  @media (max-width: 890px) {
    padding: 30px 40px;
    text-align: center;
  }
`;

const LoginTextInputs = styled(TextInputField)`
  margin-bottom: 10px;
`;

const Login: React.FC = (): JSX.Element => {
  const { handleSubmit, errors, control, getValues } = useForm<ICredential>();

  const dispatch = useDispatch();
  const { auth } = useSelector((store: IReduxState) => store.authStore);

  /**
   * Function to dispatch action to log user into platform
   * @param cred
   */
  const onSubmit = handleSubmit<ICredential>((cred) => {
    dispatch(logInUser(cred.email, cred.password));
  });

  if (auth) {
    return <Redirect to={'/admin'} />;
  }

  return (
    <LoginWrapper>
      <LoginPanel>
        <LoginHeader>
          Panel logowania dla administratora harmonogramu rezerwacji obiektów
        </LoginHeader>
        <Label>Adres e-mail</Label>
        <Controller
          name="email"
          defaultValue={''}
          control={control}
          rules={{
            required: true,
            validate: () => getValues('email').includes('@')
          }}
          render={({ onChange, onBlur, value }) => (
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
        {errors.email && <ErrorMsg innerText="Pole nie może być puste" />}
        <Label>Hasło</Label>
        <Controller
          name="password"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <LoginTextInputs
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.password}
              className="input"
              placeholder="Wpisz"
              type="password"
            />
          )}
        />
        {errors.password && <ErrorMsg innerText="Pole nie może być puste" />}
        <Button
          role="button"
          onClick={onSubmit}
          disabled={false}
          // size="SMALL"
        >
          Zaloguj się
        </Button>
      </LoginPanel>
    </LoginWrapper>
  );
};

export default Login;
