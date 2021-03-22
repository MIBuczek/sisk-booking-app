import * as React from 'react';
import { BsPlusCircle, BsFillEnvelopeFill } from 'react-icons/bs';
import styled from 'styled-components';
import ButtonIcone, { iconeStyle } from '../atoms/ButtonIcone';
import SelectInputField, { customStyles, Label, SelectWrapper } from '../atoms/SelectInputField';
import { options } from '../../utils/utils-data';

// const { LARGE } = SIZE;

const SideWrapper = styled.nav`
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  justify-content: center;
`;

const SideNav = (): JSX.Element => (
  <SideWrapper>
    <ButtonIcone role="button" onClick={() => console.log('icone')}>
      <BsPlusCircle style={iconeStyle} /> DODAJ REZERWACJE
    </ButtonIcone>
    <SelectWrapper>
      <Label>Miejscowość</Label>
      <SelectInputField options={options} styles={customStyles} />
    </SelectWrapper>
    <SelectWrapper>
      <Label>Obiekt</Label>
      <SelectInputField options={options} styles={customStyles} />
    </SelectWrapper>
  </SideWrapper>
);

export default SideNav;
