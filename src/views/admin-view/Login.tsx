import * as React from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import TextInputField from 'components/atoms/TextInputField';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Button from 'components/atoms/Button';
import { ICredential } from 'models/auth/credentials-models';
import { ReactComponent as AnimationImg } from 'assets/images/animation2.svg';
import Label from 'components/atoms/Label';

const LoginWrapper = styled.section`
  width: 100%;
  min-height: 83vh;
  margin-right: 13vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0.5rem 0;
`;

const LoginPanel = styled.form`
  grid-column: 1 / 2;
  grid-row: 1 /2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    margin-bottom: 10px;
  }
`;

const Header3 = styled.h3`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  text-transform: uppercase;
`;

const LoginAnimation = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 /2;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  svg {
    max-width: 550px;
    height: 330px;
  }
`;

const LoginTextInputs = styled(TextInputField)`
  margin-bottom: 10px;
`;

const Login: React.FC = (): JSX.Element => {
  const { handleSubmit, errors, control } = useForm<ICredential>();

  const imgWrapper = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (imgWrapper.current) {
      // const elements = imgWrapper.current.children;
      // const window = elements.getElementById('');
      // console.log(window);
    }
  }, [imgWrapper]);

  const onSubmit = handleSubmit((cred) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(cred));
  });

  return (
    <LoginWrapper>
      <LoginPanel>
        <Header3>Harmonogram Rezerwacji Obiektów</Header3>
        <Label>Podaj numer telefonu</Label>
        <Controller
          name="eMail"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <LoginTextInputs
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.eMail}
              className="input"
              placeholder="E-MAIL"
            />
          )}
        />
        {errors.eMail && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
      <LoginAnimation ref={imgWrapper}>
        <AnimationImg />
      </LoginAnimation>
    </LoginWrapper>
  );
};

export default Login;
