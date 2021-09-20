import { TSelect } from '../components/select-model';

export type ReservationState = string | Date | boolean | TSelect | null;

export interface IReservation {
  when: Date | null;
  from: Date | null;
  to: Date | null;
  person: string;
  email: string;
  phone: string;
  organization: string;
  city: TSelect | null;
  bulding: TSelect | null;
  message: string;
  police: boolean;
  [x: string]: ReservationState;
}

export const inntialReservation: IReservation = {
  when: null,
  from: null,
  to: null,
  person: '',
  email: '',
  phone: '',
  organization: '',
  city: null,
  bulding: null,
  message: '',
  police: false,
};
