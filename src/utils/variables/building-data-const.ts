// Here is list of available buildings
import {IBuilding} from 'models';
import {SIZE_OPTIONS} from './form-const';

const RADWANICE_BUILDINGS: IBuilding[] = [
   {
      name: 'Hala sportowa',
      property: 'hala-sportowa',
      city: 'radwanice',
      size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
      phone: '609 996 065',
      email: 'radwanice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Dorota Gąszczak']
   },
   {
      name: 'Sala fitness',
      property: 'sala-fitness',
      city: 'radwanice',
      size: [SIZE_OPTIONS['1/1']],
      phone: '609 996 065',
      email: 'radwanice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Dorota Gąszczak']
   }
];

const SIECHNICE_BUILDINGS: IBuilding[] = [
   {
      name: 'Hala sportowa',
      property: 'hala-sportowa',
      city: 'siechnice',
      size: [SIZE_OPTIONS['1/3'], SIZE_OPTIONS['2/3'], SIZE_OPTIONS['1/1']],
      phone: '609 996 064',
      email: 'siechnice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Bożena Kaczyńska', 'Beata Hasiuk']
   },
   {
      name: 'Sala fitness',
      property: 'sala-fitness',
      city: 'siechnice',
      size: [SIZE_OPTIONS['1/1']],
      phone: '609 996 064',
      email: 'siechnice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Bożena Kaczyńska', 'Beata Hasiuk']
   },
   {
      name: 'Boisko ze sztuczną nawierzchnią',
      property: 'boisko-sztuczna-nawierzchnia',
      city: 'siechnice',
      size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2'], SIZE_OPTIONS['1/4'], SIZE_OPTIONS['3/4']],
      phone: '609 996 064',
      email: 'siechnice.hala@gmail.com',
      extra: {
         lighting: true,
         toilets: true
      },
      employees: ['Bożena Kaczyńska', 'Beata Hasiuk']
   },
   {
      name: 'Boisko trawiaste na stadionie LA',
      property: 'boisko-trawiaste-stadionie-la',
      city: 'siechnice',
      size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2'], SIZE_OPTIONS['1/4'], SIZE_OPTIONS['3/4']],
      phone: '609 996 064',
      email: 'siechnice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Bożena Kaczyńska', 'Beata Hasiuk']
   },
   {
      name: 'Orlik',
      property: 'orlik',
      city: 'siechnice',
      size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
      phone: '609 996 064',
      email: 'siechnice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Bożena Kaczyńska', 'Beata Hasiuk']
   },
   {
      name: 'KORT#1',
      property: 'kort_1',
      city: 'siechnice',
      size: [SIZE_OPTIONS['1/1']],
      phone: '609 996 064',
      email: 'siechnice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Bożena Kaczyńska', 'Beata Hasiuk']
   },
   {
      name: 'KORT#2',
      property: 'kort_2',
      city: 'siechnice',
      size: [SIZE_OPTIONS['1/1']],
      phone: '609 996 064',
      email: 'siechnice.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Bożena Kaczyńska', 'Beata Hasiuk']
   }
];

const SWIETA_KATARZYNA_BUILDING: IBuilding[] = [
   {
      name: 'Hala sportowa ',
      property: 'hala-sportowa',
      city: 'swieta-katarzyna',
      size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
      phone: '609 996 067',
      email: 'swkatarzyna.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Urszula Ślipko']
   }
];

const ZERNIKI_WROCLAWSKIE_BUILDING: IBuilding[] = [
   {
      name: 'Hala sportowa',
      property: 'hala-sportowa',
      city: 'zerniki-wroclawskie',
      size: [SIZE_OPTIONS['1/1'], SIZE_OPTIONS['1/2']],
      phone: '609 996 068',
      email: 'zerniki.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Danuta Wilk']
   },
   {
      name: 'Sala fitness',
      property: 'sala-fitness',
      city: 'zerniki-wroclawskie',
      size: [SIZE_OPTIONS['1/1']],
      phone: '609 996 068',
      email: 'zerniki.hala@gmail.com',
      extra: {
         lighting: false,
         toilets: false
      },
      employees: ['Danuta Wilk']
   }
];

const INITIAL_ALL_BUILDINGS: {[x: string]: IBuilding[]} = {
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
