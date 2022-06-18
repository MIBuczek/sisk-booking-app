/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Select from 'react-select';

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  min-width: 50%;
  @media (max-width: 1400px) {
    min-width: 30%;
    padding-right: 50px;
    margin: 10px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media (max-width: 799px) {
    margin: 10px;
  }
`;

const SelectInputField = styled(Select)`
  width: 290px;
  height: 33px;
`;

export const customStyles = (invalid: boolean) => ({
  control: (styles: { [x: string]: string }) => ({
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
  option: (
    styles: { [x: string]: string },
    { isDisabled, isFocused, isSelected }: { [x: string]: string }
  ) => ({
    ...styles,
    backgroundColor: isDisabled ? '#b9b8b8' : isSelected ? '#afbf36' : isFocused ? '#eaeaea' : null,
    border: isDisabled
      ? '1px solid #b9b8b8'
      : isSelected
      ? '1px solid #afbf36'
      : isFocused
      ? '#eaeaea'
      : null
  }),
  placeholder: (styles: { [x: string]: string }) => ({ ...styles, left: '50%', color: '#b9b8b8' })
  // singleValue: (provided: { [x: string]: string }) => {
  //   const left = '50%';
  //   return { ...provided, left };
  // }
});

export default SelectInputField;
