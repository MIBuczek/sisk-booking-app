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
    fontSize: '1rem',
    fontWeight: '600',
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
      : null,
  }),
  placeholder: (styles: { [x: string]: string }) => ({ ...styles, left: '50%', color: '#b9b8b8' }),
});

export default SelectInputField;
