import {defaultOption, generateBookingDateOptions} from 'utils';
import Header from 'components/atoms/Header';
import * as React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {closeModal, getBookingsData, getBookingsDataByDate} from 'store';
import {BookingDataLoadOptions} from 'models';
import Label from 'components/atoms/Label';
import Button from 'components/atoms/Button';
import SelectInputField, {SelectWrapper, customStyles} from 'components/atoms/SelectInputField';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import ErrorMsg from 'components/atoms/ErrorMsg';

const LoadBookingWrapper = styled.div`
   padding: 0 20px 20px;
   display: flex;
   flex-direction: column;
   width: 500px;
`;

const MessageHeader = styled(Header)`
   width: 100%;
   margin: 20px 0 40px;
`;

const SelectLoadDataWrapper = styled(SelectWrapper)`
   margin: 20px 5px 50px;
`;

const ButtonWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: end;

   button {
      &:first-of-type {
         margin-right: 20px;
      }
   }
`;

/* Modal to load selected booking record */
const ModalLoadBookings = () => {
   const [dateOptions, setDateOptions] = React.useState<BookingDataLoadOptions[]>([]);

   const dispatch = useDispatch();

   const {
      handleSubmit,
      formState: {errors},
      control
   } = useForm<{dateRange: BookingDataLoadOptions}>({defaultValues: {dateRange: defaultOption}});

   /**
    * Method to send handle on submit action and load selected booking records.
    * @param {BookingDataLoadOptions} cred
    */
   const onSubmit: SubmitHandler<{dateRange: BookingDataLoadOptions}> = (cred): void => {
      const {label, value} = cred.dateRange;
      if (label === defaultOption.label) {
         dispatch(getBookingsData());
      } else {
         const {startDate, endDate} = value;
         const selectedLoadedPeriod = `[${label}]`;
         dispatch(getBookingsDataByDate({selectedLoadedPeriod, startDate, endDate}));
      }
      dispatch(closeModal());
   };

   /* Life cycle method to set booking date options during initialization */
   React.useEffect(() => {
      setDateOptions(generateBookingDateOptions());
   }, []);

   return (
      <LoadBookingWrapper>
         <MessageHeader> Pobierz Rezerwacji</MessageHeader>
         <SelectLoadDataWrapper>
            <Label>Wybierz zakres daty które chesz pobrac</Label>
            <Controller
               name="dateRange"
               defaultValue={defaultOption}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <SelectInputField
                     options={dateOptions}
                     styles={customStyles(!!errors.dateRange)}
                     placeholder="Wybierz"
                     onChange={onChange}
                     onBlur={onBlur}
                     value={value}
                     defaultValue={defaultOption}
                     blurInputOnSelect
                  />
               )}
            />
            {errors.dateRange && <ErrorMsg innerText={errors.dateRange.message} />}
         </SelectLoadDataWrapper>
         <ButtonWrapper>
            <Button role="button" secondary onClick={() => dispatch(closeModal())}>
               Zamknij
            </Button>
            <Button role="button" onClick={handleSubmit(onSubmit)}>
               Pobierz dane
            </Button>
         </ButtonWrapper>
      </LoadBookingWrapper>
   );
};

export default ModalLoadBookings;
