/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  min-width: 50%;

  ul.react-autocomplete-input {
    width: 190px;
    border: 1px solid #afbf36;
    border-radius: 10px;

    li.active {
      background-color: ${({ theme }) => theme.darkGrey};
    }
  }

  @media (max-width: 1400px) {
    min-width: 45%;
    margin: 10px;
  }

  @media (max-width: 799px) {
    margin: 10px;
  }
`;

const SelectInputField = styled(Select)`
  width: 290px;
  height: 33px;
`;

export const customStyles = (invalid: boolean): StylesConfig => ({
   control: (styles) => ({
      ...styles,
      width: '290px',
      height: '35px',
      minHeight: '35px',
      borderRadius: '5px',
      border: invalid ? '1px solid #cc0000' : '1px solid #afbf36',
      backgroundColor: '#eaeaea',
      letterSpacing: '-0.5px',
      fontSize: '1.2rem',
      fontWeight: '600'
   }),
   option: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled
         ? '#b9b8b8'
         : isSelected
            ? '#afbf36'
            : isFocused
               ? '#eaeaea'
               : undefined,
      border: isDisabled
         ? '1px solid #b9b8b8'
         : isSelected
            ? '1px solid #afbf36'
            : isFocused
               ? '#eaeaea'
               : undefined
   }),
   placeholder: (styles) => ({ ...styles, left: '50%', color: '#b9b8b8' })
});

export default SelectInputField;
