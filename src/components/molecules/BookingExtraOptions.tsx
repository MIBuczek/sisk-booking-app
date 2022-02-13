/* eslint-disable import/no-duplicates */
import { DataPickerField } from 'components/atoms/DatapickerField';
import Label from 'components/atoms/Label';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fadeIn } from 'style/animation';
import styled from 'styled-components';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Checkbox from 'components/atoms/Checkbox';
import Button from 'components/atoms/Button';
import { BsFillPlusCircleFill, BsXLg } from 'react-icons/bs';
import { isEmpty } from 'lodash';
import { modelDisplayValue } from 'utils';

const ExtraOptionsWrapper = styled.section`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 0.5s linear;
  border-top: ${({ theme }) => `2px solid ${theme.green}`};
  border-bottom: ${({ theme }) => `2px solid ${theme.green}`};
`;

const ExtraOptionsContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ExtraOptionHeader = styled.h3`
  width: 100%;
  margin: 10px 0;
  padding: 0 20px;
  line-height: 1.2;
  text-transform: uppercase;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
`;

const ExtraOptionsForm = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const SingleOption = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HourPickerField = styled(DataPickerField)`
  width: 100px;
`;

const ButtonWrapper = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddBtn = styled(Button)`
  margin: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

const DisplaySelectedOptions = styled.ul`
  list-style: none;
  padding: 10px 0;
  border-top: ${({ theme }) => `1px solid ${theme.green}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.s};
  li.empty {
    text-align: center;
  }
`;

const RecordDetailSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 10px 5px;
  min-width: 20%;
  width: auto;
`;

interface ExtraOptions {
  lights: boolean;
  toilets: boolean;
}

interface ISelectedExtraOptions {
  options: ExtraOptions[];
  fromHour: Date;
  toHour: Date;
}

interface BookingExtraOptionsProps {}

const BookingExtraOptions: React.FunctionComponent<BookingExtraOptionsProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [extraOptions, setExtraOptions] = React.useState<ISelectedExtraOptions[]>([]);

  const { handleSubmit, errors, control, watch, reset } = useForm();

  const onSubmit = handleSubmit(async (cred) => {
    const { fromHour, toHour, lights, toilets } = cred;
    const singleRecord = { options: [lights, toilets], fromHour, toHour };
    setExtraOptions([...extraOptions, singleRecord]);
  });

  return (
    <ExtraOptionsWrapper>
      <ExtraOptionsContent>
        <ExtraOptionHeader>Dodatkowe opcje wynajmu</ExtraOptionHeader>
        <ExtraOptionsForm>
          <SingleOption>
            <Label>Oświetlenie</Label>
            <Controller
              name="lights"
              defaultValue={false}
              control={control}
              render={({ onChange, value }) => (
                <Checkbox
                  checked={value}
                  className="checkbox"
                  name="lights"
                  changeHandler={onChange}
                  disabled={false}
                />
              )}
            />
          </SingleOption>
          <SingleOption>
            <Label>Zaplecze sanitarne</Label>
            <Controller
              name="toilets"
              defaultValue={false}
              control={control}
              render={({ onChange, value }) => (
                <Checkbox
                  checked={value}
                  className="checkbox"
                  name="toilets"
                  changeHandler={onChange}
                  disabled={false}
                />
              )}
            />
          </SingleOption>
          <InputWrapper>
            <Label>Od której godziny</Label>
            <Controller
              name="fromHour"
              defaultValue={null}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <HourPickerField
                  placeholderText="Wybierz"
                  showTimeSelect
                  showTimeSelectOnly
                  isClearable
                  shouldCloseOnSelect
                  minTime={setHours(setMinutes(new Date(), 0), 9)}
                  maxTime={setHours(setMinutes(new Date(), 30), 22)}
                  timeIntervals={15}
                  timeCaption="Godzina"
                  dateFormat="h:mm aa"
                  locale="pl"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Do której godziny</Label>
            <Controller
              name="toHour"
              defaultValue={null}
              control={control}
              rules={{ required: true }}
              render={({ onChange, onBlur, value }) => (
                <HourPickerField
                  placeholderText="Wybierz"
                  showTimeSelect
                  showTimeSelectOnly
                  isClearable
                  shouldCloseOnSelect
                  minTime={setHours(setMinutes(new Date(), 0), 9)}
                  maxTime={setHours(setMinutes(new Date(), 30), 22)}
                  timeIntervals={15}
                  timeCaption="Godzina"
                  dateFormat="h:mm aa"
                  locale="pl"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
          </InputWrapper>
          <ButtonWrapper>
            <AddBtn role="button" onClick={onSubmit}>
              Add
            </AddBtn>
          </ButtonWrapper>
        </ExtraOptionsForm>
        <DisplaySelectedOptions>
          {!isEmpty(extraOptions) ? (
            extraOptions.map(({ fromHour, toHour, options }) => (
              <li key={fromHour.getTime()}>
                <RecordDetailSpan>
                  <strong>Od godziny : </strong>
                  {modelDisplayValue(toHour)}
                </RecordDetailSpan>
                <RecordDetailSpan>
                  <strong>Do godziny: </strong>
                  {modelDisplayValue(toHour)}
                </RecordDetailSpan>
              </li>
            ))
          ) : (
            <li className="empty">Nie zostały dodane żadne dodatkowe opcje</li>
          )}
        </DisplaySelectedOptions>
      </ExtraOptionsContent>
    </ExtraOptionsWrapper>
  );
};

export default BookingExtraOptions;
