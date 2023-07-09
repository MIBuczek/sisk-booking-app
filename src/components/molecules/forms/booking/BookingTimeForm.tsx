import * as React from 'react';
import styled from 'styled-components';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import addMonths from 'date-fns/addMonths';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import {BsFillFileTextFill, BsRepeat, BsTrashFill, BsXLg} from 'react-icons/bs';
import {cloneDeep, isEmpty} from 'lodash';
import {fadeIn} from 'style/animation';
import {IBookingTimeForm, ISingleBookingDate, isNumber} from 'models';
import Label from 'components/atoms/Label';
import {DataPickerField} from 'components/atoms/DatapickerField';
import ErrorMsg from 'components/atoms/ErrorMsg';
import {
   BOOKING_SINGLE_TIME_INITIAL_VALUE,
   BOOKING_STATUS,
   BOOKING_TIME_INITIAL_VALUE,
   bookingTimeCreator,
   checkNewAddedBookingTimeConflicts,
   formatCalenderDate,
   generateMaxRangDate,
   modelDisplayValue
} from 'utils';
import RoundButton from 'components/atoms/ButtonRound';
import WarningMsg from 'components/atoms/WarningMsg';
import Checkbox from '../../../atoms/Checkbox';

const TimeWrapper = styled.section`
   width: 100%;
   padding: 10px 20px;
   display: flex;
   justify-content: center;
   animation: ${fadeIn} 0.5s linear;
   border-top: ${({theme}) => `2px solid ${theme.green}`};
   border-bottom: ${({theme}) => `2px solid ${theme.green}`};
`;

const TimeOptionsContent = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
`;

const TimeOptionHeader = styled.h3`
   width: 100%;
   margin: 10px 0;
   padding: 0 8px;
   line-height: 1.2;
   text-transform: uppercase;
   color: ${({theme}) => theme.darkGrey};
   font-size: ${({theme}) => theme.fontSize.s};
   font-weight: ${({theme}) => theme.bold};
`;

const TimeOptionsForm = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
   flex-wrap: wrap;

   @media (max-width: 720px) {
      flex-wrap: wrap;
   }
`;

const CheckboxWrapper = styled.div`
   width: 100%;
   height: auto;
   display: flex;
   align-items: center;
   margin: 10px 0;
`;

type SingleSmall = {
   small: boolean;
};

const SingleOption = styled.div<SingleSmall>`
   width: ${({small}) => (small ? '22%' : '30%')};
   min-width: ${({small}) => (small ? '130px' : '180px')};
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 0 0.425rem;
`;

const DatePicker = styled(DataPickerField)<SingleSmall>`
   width: ${({small}) => (small ? '120px' : '170px')};
`;

const ButtonWrapper = styled(SingleOption)`
   display: inline-block;
   width: 10%;
   min-width: 60px;
   height: 68px;
   justify-content: end;

   button {
      margin: 3rem auto 1rem;
   }
`;

const DisplaySelectedTimeList = styled.ul`
   list-style: none;
   padding: 10px 0;
   border-top: ${({theme}) => `1px solid ${theme.green}`};
   border-bottom: ${({theme}) => `1px solid ${theme.green}`};
   color: ${({theme}) => theme.darkGrey};
   font-size: ${({theme}) => theme.fontSize.s};
`;

const DisplaySelectedTimeItem = styled.li`
   display: flex;
   align-items: center;
   justify-content: space-around;

   &.conflict {
      color: ${({theme}) => theme.error};
   }

   &.editing {
      color: ${({theme}) => theme.warning};
   }

   &.muted {
      color: ${({theme}) => theme.middleGray};
   }

   &.empty {
      text-align: center;
   }
`;

const RecordDetailSpan = styled.span`
   font-size: ${({theme}) => theme.fontSize.s};
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

interface IProps {
   isAdmin: boolean;
   disabled: boolean;
   bookingTime: ISingleBookingDate[];
   setBookingTime: React.Dispatch<React.SetStateAction<ISingleBookingDate[]>>;
}

/**
 * React functional component to handler edition booking time reservation.
 *
 * @param {IProps} props
 * @return {JSX.Element}
 */
const BookingTimeForm: React.FunctionComponent<IProps> = ({
   isAdmin,
   disabled,
   bookingTime,
   setBookingTime
}): JSX.Element => {
   const [editedIndex, setEditedIndex] = React.useState<number | undefined>(undefined);
   const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);
   const [warningMsg, setWarningMsg] = React.useState<string | undefined>(undefined);

   const {
      handleSubmit,
      control,
      formState: {errors},
      reset,
      watch
   } = useForm<IBookingTimeForm>();

   const {startHour: start, endHour: end, cyclical} = watch();

   /**
    * Function add new time to booking time state.
    *
    * @param cred
    */
   const onSubmit: SubmitHandler<IBookingTimeForm> = (cred): void => {
      const clonedBookingTime = cloneDeep(bookingTime);
      /* */
      if (cyclical) {
         const generatedBookingsTime = bookingTimeCreator(cred);
         setBookingTime([...clonedBookingTime, ...generatedBookingsTime]);
      } else {
         const formattedCred = {
            ...cred,
            day: new Date(`${formatCalenderDate(cred.startDay)}T00:01:00.000Z`)
         };

         if (isNumber(editedIndex)) {
            const currentBookingData: ISingleBookingDate = clonedBookingTime[editedIndex];
            const updatedBookingTime: ISingleBookingDate = {
               ...currentBookingData,
               ...formattedCred
            };
            clonedBookingTime.splice(editedIndex, 1, updatedBookingTime);
         } else {
            const newBookingTime: ISingleBookingDate = {
               ...BOOKING_SINGLE_TIME_INITIAL_VALUE,
               ...formattedCred
            };
            clonedBookingTime.push(newBookingTime);
         }
         setBookingTime(clonedBookingTime);
      }
      setEditedIndex(undefined);
      reset(cloneDeep(BOOKING_TIME_INITIAL_VALUE));
   };

   /**
    * Function edit selected time selection in booking time state.
    *
    * @param e
    * @param index
    */
   const editBookingTime = (e: React.MouseEvent, index: number): void => {
      e.preventDefault();
      e.stopPropagation();
      setEditedIndex(index);
      if (isNumber(editedIndex)) return;
      const {day, startHour, endHour, status} = bookingTime[index];
      if (status !== BOOKING_STATUS.INITIAL) return;
      reset({startDay: day, startHour, endHour});
   };

   /**
    * Function to deleted selected time selection from booking time state.
    *
    * @param e
    * @param index
    */
   const deleteBookingTime = (e: React.MouseEvent, index: number): void => {
      e.preventDefault();
      e.stopPropagation();
      if (isNumber(editedIndex)) return;
      const {status} = bookingTime[index];
      if (status !== BOOKING_STATUS.INITIAL) {
         setErrorMsg('Nie można skasować pola które zostało rozliczone');
         return;
      }
      const cloneBookingTime = bookingTime.filter((v, i) => i !== index);
      setBookingTime(cloneBookingTime);
   };

   /**
    * Function to handle disabled state of action buttons.
    *
    * @param status
    */
   const handlerDisabled = (status: string): boolean =>
      status !== BOOKING_STATUS.INITIAL || isNumber(editedIndex) || disabled;

   /**
    * Function to handle disabled state of action buttons.
    *
    * @param sbt
    * @param index
    * */
   const handlerStyleClasses = (sbt: ISingleBookingDate, index: number): string => {
      if (sbt.status !== BOOKING_STATUS.INITIAL) return 'muted';
      if (index === editedIndex) return 'editing';
      if (checkNewAddedBookingTimeConflicts(sbt, index, bookingTime)) return 'conflict';
      return '';
   };

   /**
    * Function to handle time errors in booking time form.
    */
   const handlerTimeError = (): void => {
      if (!start || !end) return;
      if (start.getTime() - end.getTime() > 50) {
         setErrorMsg('Godzina zakończenia nie może być niższa badz równa godziny rozpoczęcia');
         return;
      }
      setErrorMsg(undefined);
   };

   /**
    * Function to handle booking time conflicts.
    */
   const handleConflictError = (): void => {
      const hasConflict = bookingTime.some((bt, index) =>
         checkNewAddedBookingTimeConflicts(bt, index, bookingTime)
      );
      if (hasConflict) {
         setWarningMsg('Niektóre godziny rezerwacji konfliktują ze sobą');
         return;
      }
      setWarningMsg(undefined);
   };

   /**
    * Refresh view after any changes on start end time selection.
    */
   React.useEffect(() => handlerTimeError(), [start, end]);

   /**
    * Refresh after bookingTime changes has any time conflict.
    */
   React.useEffect(() => handleConflictError(), [bookingTime]);

   return (
      <TimeWrapper>
         <TimeOptionsContent>
            <TimeOptionHeader>
               Wybierz godzince rezerwacji
               {isAdmin && isNumber(editedIndex) && (
                  <WarningMsg
                     innerText="Edytować lub usuwać można tylko rezerwacje które nie zostały jeszcze rozliczone"
                     className=""
                  />
               )}
               {warningMsg && <WarningMsg innerText={warningMsg} className="" />}
               {errorMsg && <ErrorMsg innerText={errorMsg} />}
            </TimeOptionHeader>
            <TimeOptionsForm>
               <CheckboxWrapper>
                  <Label>Rezerwacja cykliczna</Label>
                  <Controller
                     name="cyclical"
                     defaultValue={false}
                     control={control}
                     render={({field: {onChange, value}}) => (
                        <Checkbox
                           checked={value}
                           className="checkbox"
                           name="cyclical"
                           changeHandler={onChange}
                           disabled={disabled}
                        />
                     )}
                  />
               </CheckboxWrapper>
               <SingleOption small={cyclical}>
                  <Label>Kiedy</Label>
                  <Controller
                     name="startDay"
                     defaultValue={new Date()}
                     control={control}
                     rules={{
                        required: {
                           value: true,
                           message: 'Pole nie może być puste'
                        }
                     }}
                     render={({field: {onChange, onBlur, value}}) => (
                        <DatePicker
                           small={cyclical}
                           showTimeSelect={false}
                           shouldCloseOnSelect
                           placeholderText="Wybierz"
                           locale="pl"
                           minDate={!isAdmin ? new Date() : null}
                           maxDate={addMonths(generateMaxRangDate(isAdmin), 8)}
                           dateFormat="dd-MM-yyyy"
                           invalid={!!errors.startDay}
                           onChange={onChange}
                           onBlur={onBlur}
                           selected={value}
                           disabled={disabled}
                        />
                     )}
                  />
                  {errors.startDay && <ErrorMsg innerText={errors.startDay.message} />}
               </SingleOption>
               {cyclical && (
                  <SingleOption small={cyclical}>
                     <Label>Do kiedy</Label>
                     <Controller
                        name="endDay"
                        defaultValue={new Date()}
                        control={control}
                        rules={{
                           required: {
                              value: true,
                              message: 'Pole nie może być puste'
                           }
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                           <DatePicker
                              small={cyclical}
                              showTimeSelect={false}
                              shouldCloseOnSelect
                              placeholderText="Wybierz"
                              locale="pl"
                              minDate={!isAdmin ? new Date() : null}
                              maxDate={addMonths(generateMaxRangDate(isAdmin), 8)}
                              dateFormat="dd-MM-yyyy"
                              invalid={!!errors.endDay}
                              onChange={onChange}
                              onBlur={onBlur}
                              selected={value}
                              disabled={disabled}
                           />
                        )}
                     />
                     {errors.endDay && <ErrorMsg innerText={errors.endDay.message} />}
                  </SingleOption>
               )}
               <SingleOption small={cyclical}>
                  <Label>Od godziny</Label>
                  <Controller
                     name="startHour"
                     defaultValue={new Date()}
                     control={control}
                     rules={{
                        required: {
                           value: true,
                           message: 'Pole nie może być puste'
                        }
                     }}
                     render={({field: {onChange, onBlur, value}}) => (
                        <DatePicker
                           small={cyclical}
                           placeholderText="Wybierz"
                           showTimeSelect
                           showTimeSelectOnly
                           shouldCloseOnSelect
                           minTime={setHours(setMinutes(new Date(), 0), 9)}
                           maxTime={setHours(setMinutes(new Date(), 30), 22)}
                           invalid={!!errors.startHour}
                           timeIntervals={15}
                           timeCaption="Godzina"
                           dateFormat="HH:mm"
                           locale="pl"
                           onChange={onChange}
                           onBlur={onBlur}
                           selected={value}
                           disabled={disabled}
                        />
                     )}
                  />
                  {errors.startHour && <ErrorMsg innerText={errors.startHour.message} />}
               </SingleOption>
               <SingleOption small={cyclical}>
                  <Label>Do godziny</Label>
                  <Controller
                     name="endHour"
                     defaultValue={new Date()}
                     control={control}
                     rules={{
                        required: {
                           value: true,
                           message: 'Pole nie może być puste'
                        }
                     }}
                     render={({field: {onChange, onBlur, value}}) => (
                        <DatePicker
                           small={cyclical}
                           placeholderText="Wybierz"
                           showTimeSelect
                           showTimeSelectOnly
                           shouldCloseOnSelect
                           minTime={setHours(setMinutes(new Date(), 0), 9)}
                           maxTime={setHours(setMinutes(new Date(), 30), 22)}
                           invalid={!!errors.endHour}
                           timeIntervals={15}
                           timeCaption="Godzina"
                           dateFormat="HH:mm"
                           locale="pl"
                           onChange={onChange}
                           onBlur={onBlur}
                           selected={value}
                           disabled={disabled}
                        />
                     )}
                  />
                  {errors.endHour && <ErrorMsg innerText={errors.endHour.message} />}
               </SingleOption>
               <ButtonWrapper small={false}>
                  <RoundButton disabled={!!errorMsg || disabled} onClick={handleSubmit(onSubmit)}>
                     {isNumber(editedIndex) ? <BsRepeat /> : <BsXLg />}
                  </RoundButton>
               </ButtonWrapper>
            </TimeOptionsForm>
            <DisplaySelectedTimeList>
               {!isEmpty(bookingTime) ? (
                  bookingTime.map((sbt, index) => (
                     <DisplaySelectedTimeItem
                        key={sbt.startHour.getTime()}
                        className={`${handlerStyleClasses(sbt, index)}`}
                     >
                        <RecordDetailSpan>
                           <strong>Kiedy: </strong>
                           {modelDisplayValue('day', sbt.day)}
                        </RecordDetailSpan>
                        <RecordDetailSpan>
                           <strong>Od Godziny: </strong>
                           {modelDisplayValue('startHour', sbt.startHour, true)}
                        </RecordDetailSpan>
                        <RecordDetailSpan>
                           <strong>Do Godziny: </strong>
                           {modelDisplayValue('endHour', sbt.endHour, true)}
                        </RecordDetailSpan>
                        <RecordDetailsBtnPanel>
                           <RoundButton
                              disabled={handlerDisabled(sbt.status)}
                              onClick={(e) => editBookingTime(e, index)}
                           >
                              <BsFillFileTextFill />
                           </RoundButton>
                           <RoundButton
                              disabled={handlerDisabled(sbt.status)}
                              onClick={(e) => deleteBookingTime(e, index)}
                           >
                              <BsTrashFill />
                           </RoundButton>
                        </RecordDetailsBtnPanel>
                     </DisplaySelectedTimeItem>
                  ))
               ) : (
                  <DisplaySelectedTimeItem className="empty">
                     Nie została dodana żadne godzina rezerwacji
                  </DisplaySelectedTimeItem>
               )}
            </DisplaySelectedTimeList>
         </TimeOptionsContent>
      </TimeWrapper>
   );
};

export default BookingTimeForm;
