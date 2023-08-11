import {TSelect} from 'models';

interface IClientForm {
   type: TSelect;
   nick: string;
   name: string;
   contactPerson: string;
   phone: string;
   email: string;
   street: string;
   city: string;
   zipCode: string;
   nip?: string;
   id?: string;
}

export type {IClientForm};
