import { TSelect } from 'models';
import * as React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import Button from './Button';
import Label from './Label';
import SelectInputField, { customStyles, SelectWrapper } from './SelectInputField';

const RecordWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  align-items: center;
`;

const RecordList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 80%;
`;

const RecordListElement = styled.li`
  width: 100%;
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  text-align: justify;
  margin: 0;
  list-style: none;
`;

interface IProps {
  title: string;
  options: string[];
  initialState: { [x: string]: string | TSelect };
}

const SelectRecord: React.FunctionComponent<IProps> = ({ title, options = [], initialState }) => {
  const [recordState, setRecordState] = React.useState({ ...initialState });

  const recordProperty = Object.keys(initialState)[0];

  const recordStateHandler = (property: string, value: TSelect): void => {
    setRecordState((prev) => ({
      ...prev,
      [property]: value
    }));
  };

  return (
    <RecordWrapper>
      <SelectWrapper>
        <Label>{title}</Label>
        <SelectInputField
          options={options}
          styles={customStyles(false)}
          placeholder="Wybierz"
          onChange={(val: TSelect) => recordStateHandler(recordProperty, val)}
          selected={recordState[recordProperty]}
          value={recordState[recordProperty]}
        />
        <Button onClick={() => console.log(recordState[recordProperty])}>
          <BsFillPlusCircleFill />
        </Button>
      </SelectWrapper>
      <RecordList>
        {options.length ? (
          options.map((el): JSX.Element => <RecordListElement key={el}>el</RecordListElement>)
        ) : (
          <RecordListElement>Nie zostały wybrane rzadne opcje.</RecordListElement>
        )}
      </RecordList>
    </RecordWrapper>
  );
};

export default SelectRecord;
