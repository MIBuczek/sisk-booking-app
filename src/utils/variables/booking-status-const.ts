import {TSelect} from 'models';

enum BOOKING_STATUS {
   INITIAL = 'INITIAL',
   DONE = 'DONE',
   QUIT = 'QUIT'
}

const BOOKING_STATUS_OPTIONS: TSelect[] = [
   {
      label: 'Nie odbyła się',
      value: BOOKING_STATUS.INITIAL
   },
   {
      label: 'Odbyła się',
      value: BOOKING_STATUS.DONE
   },
   {
      label: 'Odwołana',
      value: BOOKING_STATUS.QUIT
   }
];

export {BOOKING_STATUS, BOOKING_STATUS_OPTIONS};
