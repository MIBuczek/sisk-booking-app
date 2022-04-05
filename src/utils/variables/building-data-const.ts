// Here is list of available buildings
import { IBuilding } from 'models';
import { SIZE_OPTIONS } from './form-const';

const RADWANICE_BUILDINGS: IBuilding[] = [
  {
    name: 'Hala sportowa',
    property: 'hala-sportowa',
    city: 'radwanice',
    size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  },
  {
    name: 'Sala fitness',
    property: 'sala-fitness',
    city: 'radwanice',
    size: [SIZE_OPTIONS['1/1']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  }
];

const SIECHNICE_BUILDINGS: IBuilding[] = [
  {
    name: 'Hala sportowa',
    property: 'hala-sportowa',
    city: 'siechnice',
    size: [SIZE_OPTIONS['1/3'], SIZE_OPTIONS['2/3'], SIZE_OPTIONS['1/1']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  },
  {
    name: 'Sala fitness',
    property: 'sala-fitness',
    city: 'siechnice',
    size: [SIZE_OPTIONS['1/1']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  },
  {
    name: 'Boisko ze sztuczną nawierzchnią',
    property: 'boisko-sztuczna-nawierzchnia',
    city: 'siechnice',
    size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2'], SIZE_OPTIONS['1/4'], SIZE_OPTIONS['3/4']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: true,
      toilets: true
    },
    employees: []
  },
  {
    name: 'Boisko trawiaste na stadionie LA',
    property: 'boisko-trawiaste-stadionie-la',
    city: 'siechnice',
    size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2'], SIZE_OPTIONS['1/4'], SIZE_OPTIONS['3/4']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  },
  {
    name: 'Orlik',
    property: 'orlik',
    city: 'siechnice',
    size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  }
];

const SWIETA_KATARZYNA_BUILDING: IBuilding[] = [
  {
    name: 'Hala sportowa ',
    property: 'hala-sportowa',
    city: 'swieta-katarzyna',
    size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  }
];

const ZERNIKI_WROCLAWSKIE_BUILDING: IBuilding[] = [
  {
    name: 'Hala sportowa',
    property: 'hala-sportowa',
    city: 'zerniki-wroclawskie',
    size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  },
  {
    name: 'Sala fitness',
    property: 'sala-fitness',
    city: 'zerniki-wroclawskie',
    size: [SIZE_OPTIONS['1/1']],
    phone: '123-123-123',
    email: 'xxx@xx.pl',
    extra: {
      lighting: false,
      toilets: false
    },
    employees: []
  }
];

const INITIAL_ALL_BUILDINGS: { [x: string]: IBuilding[] } = {
  radwanice: RADWANICE_BUILDINGS,
  siechnice: SIECHNICE_BUILDINGS,
  'swieta-katarzyna': SWIETA_KATARZYNA_BUILDING,
  'zerniki-wroclawskie': ZERNIKI_WROCLAWSKIE_BUILDING
};
export {
  RADWANICE_BUILDINGS,
  SIECHNICE_BUILDINGS,
  SWIETA_KATARZYNA_BUILDING,
  ZERNIKI_WROCLAWSKIE_BUILDING,
  INITIAL_ALL_BUILDINGS
};
