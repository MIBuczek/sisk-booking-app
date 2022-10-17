/* eslint-disable no-param-reassign */
import { bookingIndexTypeChecker, ExtraOptions, IBooking, IClient, TSelect } from 'models';
import { SIZE_OPTIONS, SIZE_OPTIONS_BTN } from 'utils/variables/form-const';
import { SIZE_FIELD_OPTIONS } from 'utils/variables/options-const';

/**
 * Function to transform first string letter to upper case.
 * @param  s
 * @returns {String}
 */
const firstLetterUpperCase = (s: string): string =>
  s.charAt(0).toLocaleUpperCase() + s.substring(1).toLowerCase();

/**
 * Function to find which option was already selected.
 * @param  value
 * @param  options
 * @returns {TSelect}
 */
const findSelectedOption = (value: string, options: TSelect[]): TSelect => {
  const selectedOption = options.find((c) => c.value === value);
  if (selectedOption) return selectedOption;
  return options[0];
};

/**
 * Table pagination method. Calculate number of items per post per page and current page.
 * @param  items
 * @param  currentPage
 * @param  postPerPage
 * @returns {Array<IClient | IBooking>}
 */
const pagination = (
  items: (IClient | IBooking)[],
  currentPage: number,
  postPerPage: number
): (IClient | IBooking)[] => {
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  return items.slice(indexOfFirstPost, indexOfLastPost);
};

/**
 * Function to generate numbers of page related to the number of table items.
 * @param  totalPost
 * @param  postPerPage
 * @returns {Array<Number>}
 */
const paginationItems = (totalPost: number, postPerPage: number): number[] => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

/**
 * Function to find size option according selected building.
 * @param  buildingValue
 * @param  cityValue
 * @returns {Array<SIZE_OPTIONS>}
 */
const selectSizeFieldOptions = (buildingValue: string, cityValue: string): SIZE_OPTIONS[] => {
  if (buildingValue && cityValue) return SIZE_FIELD_OPTIONS[buildingValue][cityValue];
  return SIZE_OPTIONS_BTN;
};

/**
 * Function to generate clients option for dropdown.
 * @param  clients
 * @returns {Array<TSelect>}
 */
const selectClientOptions = (clients: IClient[]): TSelect[] => {
  if (!clients) return [];
  return clients.map((c) => ({ label: c.name, value: c.id || '' }));
};

/**
 * Function to generate clients option for dropdown.
 * @param  clients
 * @param clientId
 * @returns {Array<TSelect>}
 */
const selectedClientIdOption = (clients: IClient[], clientId: string): TSelect | undefined =>
  selectClientOptions(clients).find((o) => o.value === clientId);

/**
 * Function to check selected options and return value to display in list.
 * @param  options
 * @returns {String}
 */
const checkSelectedOption = (options: ExtraOptions[]): string =>
  options
    .reduce((acc: string[], opt) => {
      if (opt.lights) acc.push('Światła');
      if (opt.toilets) acc.push('Zaplecze sanitarne');
      return acc;
    }, [])
    .join(',');

/**
 * Function to find current item index related to current page and post per page.
 * @param itemIndex
 * @param currentPage
 * @param postPerPage
 */
const findCurrentItemIndex = (
  itemIndex: number,
  currentPage: number,
  postPerPage: number
): number => {
  if (currentPage > 1) {
    return (currentPage - 1) * postPerPage + itemIndex;
  }
  return itemIndex;
};

/**
 * Function to check if index is number to return proper bookingTimeIndex
 * @param index
 * @return Number
 */
const checkIndex = (index: number | null): number => {
  if (bookingIndexTypeChecker(index)) {
    return index;
  }
  return 0;
};

/**
 * Function to check is current item last on array
 * @param currentIndex
 * @param arrayLength
 * @return Boolean
 */
const checkIsLastIndex = (currentIndex: number, arrayLength: number): boolean =>
  currentIndex === arrayLength;

export {
  selectSizeFieldOptions,
  selectClientOptions,
  selectedClientIdOption,
  pagination,
  paginationItems,
  findSelectedOption,
  firstLetterUpperCase,
  checkSelectedOption,
  findCurrentItemIndex,
  checkIndex,
  checkIsLastIndex
};
