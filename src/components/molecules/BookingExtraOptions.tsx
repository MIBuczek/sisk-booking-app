/* eslint-disable import/no-duplicates */
import { DataPickerField } from 'components/atoms/DatapickerField';
import Label from 'components/atoms/Label';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fadeIn } from 'style/animation';
import styled from 'styled-components';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import Checkbox from 'components/atoms/Checkbox';
import Button from 'components/atoms/Button';
import { BsFillFileTextFill, BsTrashFill, BsXLg } from 'react-icons/bs';
import { isEmpty } from 'lodash';
import { checkSelectedOption, INITIAL_EXTRA_OPTIONS, modelDisplayValue } from 'utils';
import { IExtraOptionForm, ISelectedExtraOptions } from 'models';

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

const RoundBtn = styled(Button)`
  margin: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  svg {
    transform: rotate(45deg);
    width: 14px;
    height: 14px;
  }
`;

const DisplaySelectedOptions = styled.ul`
  list-style: none;
  padding: 10px 0;
  border-top: ${({ theme }) => `1px solid ${theme.green}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const DisplaySelectedOptionElement = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;
  &.empty {
    text-align: center;
  }
`;

const RecordDetailSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 10px 5px;
  min-width: 20%;
  width: auto;
  &:first-of-type {
    min-width: 30%;
  }
`;

const RecordDetailsBtnPanel = styled.div`
  min-width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    margin-left: 1rem;
    svg {
      transform: rotate(0deg);
    }
  }
`;

interface BookingExtraOptionsProps {
  extraOptions: ISelectedExtraOptions[];
  setExtraOptions: React.Dispatch<React.SetStateAction<ISelectedExtraOptions[]>>;
}

const BookingExtraOptions: React.FunctionComponent<BookingExtraOptionsProps> = ({
  extraOptions,
  setExtraOptions
}) => {
  const { handleSubmit, control, watch, reset } = useForm<IExtraOptionForm>();

  const lightValue = watch('lights');
  const toiletsValue = watch('toilets');

  const onSubmit = handleSubmit(async (cred) => {
    const { fromHour, toHour, lights, toilets } = cred;
    const singleRecord = { options: [{ lights }, { toilets }], fromHour, toHour };
    setExtraOptions([...extraOptions, singleRecord]);
    reset({ ...INITIAL_EXTRA_OPTIONS });
  });

  const editExtraOption = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const { options, fromHour, toHour } = extraOptions[index];
    reset({ fromHour, toHour, lights: options[0].lights, toilets: options[1].toilets });
    deleteExtraOption(e, index);
  };

  const deleteExtraOption = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setExtraOptions(extraOptions.filter((o, i) => i !== index));
  };

  const disabledBtn = !(lightValue || toiletsValue);

  React.useEffect(() => undefined, [extraOptions]);

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
              defaultValue={new Date()}
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
              defaultValue={new Date()}
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
            <RoundBtn role="button" onClick={onSubmit} disabled={disabledBtn}>
              <BsXLg />
            </RoundBtn>
          </ButtonWrapper>
        </ExtraOptionsForm>
        <DisplaySelectedOptions>
          {!isEmpty(extraOptions) ? (
            extraOptions.map(({ fromHour, toHour, options }, index) => (
              <DisplaySelectedOptionElement key={fromHour.getTime()}>
                <RecordDetailSpan>
                  <strong>Opcje : </strong>
                  {checkSelectedOption(options)}
                </RecordDetailSpan>
                <RecordDetailSpan>
                  <strong>Od godziny : </strong>
                  {modelDisplayValue(fromHour)}
                </RecordDetailSpan>
                <RecordDetailSpan>
                  <strong>Do godziny: </strong>
                  {modelDisplayValue(toHour)}
                </RecordDetailSpan>
                <RecordDetailsBtnPanel>
                  <RoundBtn>
                    <BsFillFileTextFill role="button" onClick={(e) => editExtraOption(e, index)} />
                  </RoundBtn>
                  <RoundBtn>
                    <BsTrashFill role="button" onClick={(e) => deleteExtraOption(e, index)} />
                  </RoundBtn>
                </RecordDetailsBtnPanel>
              </DisplaySelectedOptionElement>
            ))
          ) : (
            <DisplaySelectedOptionElement className="empty">
              Nie zostały dodane żadne dodatkowe opcje
            </DisplaySelectedOptionElement>
          )}
        </DisplaySelectedOptions>
      </ExtraOptionsContent>
    </ExtraOptionsWrapper>
  );
};

export default BookingExtraOptions;
