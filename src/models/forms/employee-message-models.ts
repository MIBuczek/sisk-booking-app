import {TSelect} from 'models/components/select-model';

interface IEmployeeMessageForm {
   email: string;
   person: TSelect;
   message: string;
}

interface IEmployeeMessage {
   email: string;
   person: string;
   message: string;
}

export type {IEmployeeMessage, IEmployeeMessageForm};
