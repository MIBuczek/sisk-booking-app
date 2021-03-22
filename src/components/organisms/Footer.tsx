import React, { useContext } from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import styled from 'styled-components';
import { ModalContext } from '../../context/ModalContext';
import ButtonIcone, { iconeStyle } from '../atoms/ButtonIcone';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  button {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
const Paragraph = styled.p`
  font-size: 8px;
  text-transform: uppercase;
  margin: auto;
`;

const Footer = (): JSX.Element => {
  const { setModal } = useContext(ModalContext);
  return (
    <FooterWrapper>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare nec leo in vehicula.
        Morbi dapibus placerat sapien nec faucibus. Sed ac tristique felis. Suspendisse potenti.
      </Paragraph>
      <ButtonIcone
        role="button"
        onClick={() =>
          setModal({ type: 'MESSAGE', isOpen: true, callback: () => console.log('message') })
        }
      >
        <BsFillEnvelopeFill style={iconeStyle} /> NAPISZ DO NAS
      </ButtonIcone>
    </FooterWrapper>
  );
};

export default Footer;
