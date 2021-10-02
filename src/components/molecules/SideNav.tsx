import * as React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import styled from 'styled-components';
import ButtonIcone, { iconeStyle } from '../atoms/ButtonIcone';
import SelectInputField, { customStyles, SelectWrapper } from '../atoms/SelectInputField';
import { options } from '../../utils/utils-data';
import { ModalContext } from '../../context/ModalContext';
import { MODAL_TYPES } from '../../utils/modal-variables';
import Label from '../atoms/Label';

// const { LARGE } = SIZE;

const SideWrapper = styled.aside`
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  justify-content: center;
  padding-top: 30px;
`;

const SideNav = (): JSX.Element => {
  const { RESERVATION } = MODAL_TYPES;

  const { setModal } = React.useContext(ModalContext);

  return (
    <SideWrapper>
      <ButtonIcone
        role="button"
        onClick={() =>
          setModal({
            type: RESERVATION,
            isOpen: true,
            callback: () => null,
          })
        }
      >
        <BsPlusCircle style={iconeStyle} /> DODAJ REZERWACJE
      </ButtonIcone>
      <SelectWrapper>
        <Label>Miejscowość</Label>
        <SelectInputField options={options} styles={customStyles(false)} />
      </SelectWrapper>
      <SelectWrapper>
        <Label>Obiekt</Label>
        <SelectInputField options={options} styles={customStyles(false)} />
      </SelectWrapper>
    </SideWrapper>
  );
};

export default SideNav;
