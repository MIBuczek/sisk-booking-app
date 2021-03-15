import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const SelectInput = styled(Select)`
  width: 300px;
  height: 40px;
`;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
export interface IProps {}

const x = {
  control: (styles: { [x: string]: string }) => ({
    ...styles,
    width: '300px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #afbf36',
    backgroundColor: '#eaeaea',
  }),
  options: (styles: { [x: string]: string }) => ({
    ...styles,
    border: '1px solid #afbf36',
  }),
};

const SelectInputField: React.SFC<IProps> = (): JSX.Element => (
  <SelectInput options={options} styles={x} />
);

export default SelectInputField;
