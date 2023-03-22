import { IExtraOptionForm } from 'models';

const currentDate = new Date();

const INITIAL_EXTRA_OPTIONS: IExtraOptionForm = {
  fromHour: currentDate,
  toHour: currentDate,
  lights: false,
  toilets: false
};

export { INITIAL_EXTRA_OPTIONS };
