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
  margin-right: 13vh;
  display: grid;
  grid-template-columns: 1fr;
  margin: 0.5rem 0;
  animation: ${fadeIn} 0.5s linear;
`;

const LoginPanel = styled.form`
  grid-column: 1 / 2;
  grid-row: 1 /2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header3 = styled.h3`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  text-transform: uppercase;
`;

const LoginTextInputs = styled(TextInputField)`
  margin-bottom: 10px;
`;

const Login: React.FC = (): JSX.Element => {
  const { handleSubmit, errors, control } = useForm<ICredential>();

  const dispatch = useDispatch();
  const { auth } = useSelector((store: IReduxState) => store.authStore);

  const onSubmit = handleSubmit<ICredential>((cred) => {
    dispatch(logInUser(cred.email, cred.password));
  });

  if (auth) {
    return <Redirect to={'/admin'} />;
  }
  return (
    <LoginWrapper>
      <LoginPanel>
        <Header3>Panel logowania do harmonogram rezerwacji obiektów</Header3>
        <Label>Adres E-mail</Label>
        <Controller
          name="email"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <LoginTextInputs
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.email}
              className="input"
              placeholder="E-MAIL"
            />
          )}
        />
        {errors.email && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
              placeholder="HASŁO"
              type="password"
            />
          )}
        />
        {errors.password && <ErrorMsg innerText="Pole nie moze byc puste" />}
        <Button
          role="button"
          onClick={onSubmit}
          disabled={false}
          // size="SMALL"
        >
          ZALOGUJ SIE
        </Button>
      </LoginPanel>
    </LoginWrapper>
  );
};

export default Login;
