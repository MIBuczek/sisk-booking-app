/**
 * Method to check if current value is number
 *
 * @param val
 * @return {Boolean}
 */
const isNumber = (val: unknown): val is number => typeof val === 'number';

export {isNumber};
