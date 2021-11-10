import { IBuildingOptions, ISizeFieldOptions, TSelect } from 'models/components/select-model';

const CLIENT_TYPE: TSelect[] = [
  { label: 'Osoba prywatna', value: 'individual' },
  { label: 'Firma', value: 'company' }
];

const SIZE_TYPE_HALF: TSelect[] = [
  { label: '1/2', value: '1/2' },
  { label: '2/2', value: '2/2' }
];

const SIZE_TYPE_QUATRE: TSelect[] = [
  { label: '1/4', value: '1/4' },
  { label: '2/4', value: '2/4' },
  { label: '4/4', value: '4/4' }
];

const CITY_OPTIONS: TSelect[] = [
  { label: 'Radwanice', value: 'radwanice' },
  { label: 'Siechnice', value: 'siechnice' },
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
    'obiekt-one': SIZE_TYPE_HALF,
    'obiekt-two': SIZE_TYPE_QUATRE
  },
  siechnice: {
    'obiekt-tree': SIZE_TYPE_HALF,
    'obiekt-four': SIZE_TYPE_HALF
  },
  'swieta-katarzyna': {
    'obiekt-five': SIZE_TYPE_HALF,
    'obiekt-six': SIZE_TYPE_QUATRE
  },
  'zerniki-wroclawskie': {
    'obiekt-seven': SIZE_TYPE_HALF,
    'obiekt-eight': SIZE_TYPE_HALF
  }
};

export { CITY_OPTIONS, BUILDINGS_OPTIONS, SIZE_FIELD_OPTIONS, CLIENT_TYPE };
