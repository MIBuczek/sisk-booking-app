/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Select from 'react-select';

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const SelectInputField = styled(Select)`
  width: 300px;
  height: 40px;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.darkColor};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  margin: 8px 0;
`;

export const customStyles = {
  control: (styles: { [x: string]: string }) => ({
    ...styles,
    width: '300px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #afbf36',
    backgroundColor: '#eaeaea',
  }),
  option: (
    styles: { [x: string]: string },
    { isDisabled, isFocused, isSelected }: { [x: string]: string }
  ) => ({
    ...styles,
    backgroundColor: isDisabled ? null : isSelected ? '#afbf36' : isFocused ? '#eaeaea' : null,
  }),
};

export default SelectInputField;
