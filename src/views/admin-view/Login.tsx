import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';

import TextInputField from 'components/atoms/TextInputField';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Button from 'components/atoms/Button';
import { ICredential } from 'models/auth/credentials-models';
import { ReactComponent as AnimationImg } from 'assets/images/animation2.svg';

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

const Login: React.FC = (): JSX.Element => {
  const [credentials, setCredentials] = React.useState<ICredential>({
    eMail: '',
    password: ''
  });
  const { register, handleSubmit, setValue, errors } = useForm();

  const imgWrapper = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (imgWrapper.current) {
      // const elements = imgWrapper.current.children;
      // const window = elements.getElementById('');
      // console.log(window);
    }
  }, [imgWrapper]);

  const { eMail, password } = credentials;

  const stateHandler = (value: string, property: string): void => {
    setCredentials((prev) => ({ ...prev, [property]: value }));
  };

  const onSubmit = handleSubmit((cred) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(cred));
  });

  return (
    <LoginWrapper>
      <LoginPanel onSubmit={onSubmit}>
        <Header3>Harmonogram Rezerwacji Obiektów</Header3>
        <TextInputField
          name="eMail"
          placeholder="E-MAIL"
          value={eMail}
          onChange={({ target }) => stateHandler(target.value, target.name)}
          ref={register({ required: true })}
        />
        {errors.eMail && (
          <ErrorMsg>
            required field <BsExclamationCircle />
          </ErrorMsg>
        )}
        <TextInputField
          name="password"
          placeholder="HASŁO"
          value={password}
          onChange={({ target }) => stateHandler(target.value, target.name)}
          ref={register({ required: true })}
        />
        {errors.password && (
          <ErrorMsg>
            required field
            <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Button
          role="button"
          onClick={() => {
            setValue('eMail', eMail);
            setValue('password', password);
          }}
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
