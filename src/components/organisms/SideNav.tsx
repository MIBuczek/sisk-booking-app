import * as React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ButtonIcon, { iconStyle } from '../atoms/ButtonIcon';
import SelectInputField, { customStyles, SelectWrapper } from '../atoms/SelectInputField';
import Label from '../atoms/Label';
import ReservationDetails from '../molecules/ReservationDetails';
import { openModal } from '../../store/modal/modalAction';
import { MODAL_TYPES } from '../../utils/variables/store-const';

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
  const dispatch = useDispatch();
  return (
    <SideWrapper>
      <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.RESERVATION))}>
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
