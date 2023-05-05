import {IBuilding, IBuildingOptions, TSelect} from 'models';
import {BUILDINGS_OPTIONS} from 'utils';

/**
 * Function to generate building option for dropdown
 *
 * @param {Array<IBuilding>} buildings
 * @returns {IBuildingOptions}
 */
const generateBuildingOptions = (buildings: IBuilding[]): IBuildingOptions => {
   if (!buildings?.length) return BUILDINGS_OPTIONS;
   return buildings.reduce((acc: {[x: string]: TSelect[]}, b: IBuilding) => {
      acc[b.city] = acc[b.city]
         ? [...acc[b.city], {value: b.property, label: b.name}]
         : [{value: b.property, label: b.name}];
      return acc;
   }, {});
};

/**
 * Function to generate building per city
 * @param {Array<IBuilding>} buildings
 * @returns {Array<IBuilding>}
 */
const generateAllBuilding = (buildings: IBuilding[]): {[x: string]: IBuilding[]} | null => {
   if (!buildings.length) return null;
   return buildings.reduce((acc: {[x: string]: IBuilding[]}, b: IBuilding) => {
      acc[b.city] = acc[b.city] ? [...acc[b.city], {...b}] : [{...b}];
      return acc;
   }, {});
};

export {generateBuildingOptions, generateAllBuilding};
