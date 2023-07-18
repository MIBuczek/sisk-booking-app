import {TSelect} from 'models';
import {SIZE_OPTIONS} from 'utils';

interface IBookingForm {
   city: TSelect;
   building: TSelect;
   size: SIZE_OPTIONS;
   nick: string;
   person: string;
   club?: string;
   clientId?: TSelect;
   email: string;
   phone: string;
   accepted: boolean;
   message: string;
   payment: TSelect;
   discount: string;
   archive: boolean;
   id?: string;
}

export type {IBookingForm};
