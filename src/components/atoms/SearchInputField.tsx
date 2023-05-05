import {debounce} from 'lodash';
import {IBooking, IClient} from 'models';
import * as React from 'react';
import {BsSearch, BsXLg} from 'react-icons/bs';
import styled from 'styled-components';
import {searchSelectedContent} from 'utils';
import TextInputField from 'components/atoms/TextInputField';
import Button from 'components/atoms/Button';

const SearchInputWrapper = styled.div`
   display: inline-block;
   position: relative;
   margin: 1rem 0;

   svg {
      position: absolute;
      top: 30%;
      left: 260px;
      color: #454545;
   }
`;

const ClearBtn = styled(Button)`
   position: absolute;
   margin: 0;
   right: 0;
   padding: 3px 5px;
   height: 35px;
   width: 35px;

   svg {
      position: static;
   }
`;

interface IProps {
   type: string;
   placeholder: string;
   searchContent: (IClient | IBooking)[];
   searchProperty: string;
   searchContentHandler: (searchResults: (IClient | IBooking)[], searchPhase: string) => void;
}

/**
 * Search Input Component.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const SearchInputField: React.FunctionComponent<IProps> = ({
   type,
   placeholder,
   searchContent,
   searchProperty,
   searchContentHandler
}): JSX.Element => {
   const [searchPhase, setSearchPhase] = React.useState('');

   /**
    * Search handler method.
    */
   const searchHandler = (): void => {
      if (!searchPhase) searchContentHandler(searchContent, '');
      else
         searchContentHandler(
            searchSelectedContent(searchContent, searchProperty, searchPhase),
            searchPhase
         );
   };

   /**
    * Delayed Query for typo in search filed.
    */
   const delayedQuery = React.useCallback(debounce(searchHandler, 300), [searchPhase]);

   /**
    * Effect to refresh view after delayedQuery results.
    */
   React.useEffect(() => {
      delayedQuery();
      return delayedQuery.cancel;
   }, [delayedQuery, searchPhase]);

   return (
      <SearchInputWrapper>
         <TextInputField
            name="search-input"
            type="text"
            id={type}
            value={searchPhase}
            placeholder={placeholder}
            onChange={(e) => setSearchPhase(e.target.value)}
         />
         {searchPhase ? (
            <ClearBtn type="button" onClick={() => setSearchPhase('')}>
               <BsXLg />
            </ClearBtn>
         ) : (
            <BsSearch />
         )}
      </SearchInputWrapper>
   );
};

export default SearchInputField;
