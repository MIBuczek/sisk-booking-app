import * as React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import styled from 'styled-components';
import ButtonIcon, { iconStyle } from '../atoms/ButtonIcon';
import SelectInputField, { customStyles, SelectWrapper } from '../atoms/SelectInputField';
import { ModalContext } from '../../context/ModalContext';
import { MODAL_TYPES } from '../../utils/variables/modal-const';
import Label from '../atoms/Label';
import ReservationDetails from '../molecules/ReservationDetails';

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
      <ButtonIcon
        role="button"
        onClick={() =>
          setModal({
            type: RESERVATION,
            isOpen: true,
            callback: () => null,
          })
        }
      >
        <BsPlusCircle style={iconStyle} /> DODAJ REZERWACJE
      </ButtonIcon>
      <SelectWrapper>
        <Label>Miejscowość</Label>
        <SelectInputField options={[]} styles={customStyles(false)} />
      </SelectWrapper>
      <SelectWrapper>
        <Label>Obiekt</Label>
        <SelectInputField options={[]} styles={customStyles(false)} />
      </SelectWrapper>
      <ReservationDetails />
    </SideWrapper>
  );
};

export default SideNav;
