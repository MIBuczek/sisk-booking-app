import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import Button from '../../components/atoms/Button';
import TextInputField from '../../components/atoms/TextInputField';
import { ICredencial } from '../../models/credencials-models';
import { ReactComponent as AnimationImg } from '../../assets/images/animation2.svg';
import ErrorMsg from '../../components/atoms/ErrorMsg';

const LoginWrapper = styled.section`
  width: 100%;
  min-height: 83vh;
  margin-right: 13vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0.5rem 0;
`;

const LoginPannel = styled.form`
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

const LoginAnimacion = styled.div`
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
  const [credencial, setCredencial] = React.useState<ICredencial>({
    eMail: '',
    passoword: '',
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

  const { eMail, passoword } = credencial;

  const stateHandler = (value: string, property: string): void => {
    setCredencial((prev) => ({ ...prev, [property]: value }));
  };

  const onSubmit = handleSubmit((cred) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(cred));
  });

  return (
    <LoginWrapper>
      <LoginPannel onSubmit={onSubmit}>
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
          name="passoword"
          placeholder="HASŁO"
          value={passoword}
          onChange={({ target }) => stateHandler(target.value, target.name)}
          ref={register({ required: true })}
        />
        {errors.passoword && (
          <ErrorMsg>
            required field
            <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Button
          role="button"
          onClick={() => {
            setValue('eMail', eMail);
            setValue('passoword', passoword);
          }}
          disabled={false}
          // size="SMALL"
        >
          ZALOGUJ SIE
        </Button>
      </LoginPannel>
      <LoginAnimacion ref={imgWrapper}>
        <AnimationImg />
      </LoginAnimacion>
    </LoginWrapper>
  );
};

export default Login;
