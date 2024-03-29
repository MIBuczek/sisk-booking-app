import {IBuilding, IBuildingOptions, ISizeFieldOptions, TSelect} from 'models';
import {
   RADWANICE_BUILDINGS,
   SIECHNICE_BUILDINGS,
   SWIETA_KATARZYNA_BUILDING,
   ZERNIKI_WROCLAWSKIE_BUILDING
} from './building-data-const';
import {CLIENT_TYPE, SIZE_OPTIONS} from './form-const';

const generateBuildingOptions = (b: IBuilding) => ({label: b.name, value: b.property});

const generateSizeOptions = (buildings: IBuilding[]) =>
   buildings.reduce((acc: {[x: string]: SIZE_OPTIONS[]}, b: IBuilding) => {
      acc[b.property] = b.size;
      return acc;
   }, {});

const CLIENT_OPTIONS: TSelect[] = [
   {label: 'Osoba prywatna', value: CLIENT_TYPE.CLIENT},
   {label: 'Firma', value: CLIENT_TYPE.COMPANY}
];

const CITY_OPTIONS: TSelect[] = [
   {label: 'Siechnice', value: 'siechnice'},
   {label: 'Radwanice', value: 'radwanice'},
   {label: 'Święta Katarzyna', value: 'swieta-katarzyna'},
   {label: 'Żerniki Wrocławskie', value: 'zerniki-wroclawskie'}
];

const BUILDINGS_OPTIONS: IBuildingOptions = {
   radwanice: RADWANICE_BUILDINGS.map(generateBuildingOptions),
   siechnice: SIECHNICE_BUILDINGS.map(generateBuildingOptions),
   'swieta-katarzyna': SWIETA_KATARZYNA_BUILDING.map(generateBuildingOptions),
   'zerniki-wroclawskie': ZERNIKI_WROCLAWSKIE_BUILDING.map(generateBuildingOptions)
};

const SIZE_FIELD_OPTIONS: ISizeFieldOptions = {
   radwanice: generateSizeOptions(RADWANICE_BUILDINGS),
   siechnice: generateSizeOptions(SIECHNICE_BUILDINGS),
   'swieta-katarzyna': generateSizeOptions(SWIETA_KATARZYNA_BUILDING),
   'zerniki-wroclawskie': generateSizeOptions(ZERNIKI_WROCLAWSKIE_BUILDING)
};

const PAYMENTS_OPTIONS: TSelect[] = [
   {value: 'transfer', label: 'Przelew'},
   {value: 'cash', label: 'Gotówka'},
   {value: 'free', label: 'Bezpłatne'}
];

const DISCOUNT_OPTIONS: string[] = [
   '0%',
   '10%',
   '20%',
   '30%',
   '40%',
   '50%',
   '60%',
   '70%',
   '80%',
   '90%',
   '100%'
];

export {
   CITY_OPTIONS,
   BUILDINGS_OPTIONS,
   CLIENT_OPTIONS,
   SIZE_FIELD_OPTIONS,
   PAYMENTS_OPTIONS,
   DISCOUNT_OPTIONS
};
