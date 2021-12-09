import { IBuildingOptions, ISizeFieldOptions, TSelect } from 'models/components/select-model';
import { CLIENT_TYPE, SIZE_OPTIONS } from './form-const';

const CLIENT_OPTIONS: TSelect[] = [
  { label: 'Osoba prywatna', value: CLIENT_TYPE.CLIENT },
  { label: 'Firma', value: CLIENT_TYPE.COMPANY }
];

const CITY_OPTIONS: TSelect[] = [
  { label: 'Siechnice', value: 'siechnice' },
  { label: 'Radwanice', value: 'radwanice' },
  { label: 'Świeta Katarzyna', value: 'swieta-katarzyna' },
  { label: 'Żerniki Wrocławskie', value: 'zerniki-wroclawskie' }
];

const BUILDINGS_OPTIONS: IBuildingOptions = {
  radwanice: [
    { label: 'Obiekt 1', value: 'obiekt-one' },
    { label: 'obiekt 2', value: 'obiekt-two' }
  ],
  siechnice: [
    { label: 'Obiekt 3', value: 'obiekt-tree' },
    { label: 'obiekt 4', value: 'obiekt-four' }
  ],
  'swieta-katarzyna': [
    { label: 'Obiekt 5', value: 'obiekt-five' },
    { label: 'obiekt 6', value: 'obiekt-six' }
  ],
  'zerniki-wroclawskie': [
    { label: 'Obiekt 7', value: 'obiekt-seven' },
    { label: 'obiekt 8', value: 'obiekt-eight' }
  ]
};

const SIZE_FIELD_OPTIONS: ISizeFieldOptions = {
  radwanice: {
    'obiekt-one': [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['2/2']],
    'obiekt-two': [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['2/2']]
  },
  siechnice: {
    'obiekt-tree': [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['2/2']],
    'obiekt-four': [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['2/2'], SIZE_OPTIONS['4/4']]
  },
  'swieta-katarzyna': {
    'obiekt-five': [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['2/2'], SIZE_OPTIONS['3/3']],
    'obiekt-six': [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['2/2'], SIZE_OPTIONS['4/4']]
  },
  'zerniki-wroclawskie': {
    'obiekt-seven': [SIZE_OPTIONS['1/1']],
    'obiekt-eight': [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['2/2']]
  }
};

export { CITY_OPTIONS, BUILDINGS_OPTIONS, SIZE_FIELD_OPTIONS, CLIENT_OPTIONS };
