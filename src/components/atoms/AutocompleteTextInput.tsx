import TextInputField from 'components/atoms/TextInputField';
import React from 'react';
import styled from 'styled-components';

const AutocompleteWrapper = styled.div`
   position: relative;
`;

const OptionList = styled.ul`
   list-style-type: none;
   padding: 5px 0;
   margin: 0;
   position: absolute;
   top: 100%;
   left: 0;
   width: 100%;
   background-color: #fff;
   border: 1px solid rgb(204, 204, 204);
   border-radius: 0 0 10px 10px;
   border-top: none;
   z-index: 1;
`;

const OptionItem = styled.li`
   padding: 5px;
   cursor: pointer;
   &:hover {
      background-color: #f5f5f5;
   }
`;

const OptionButton = styled.button`
   background: transparent;
   border: none;
   width: 100%;
   text-align: center;
   padding: 5px;
   cursor: pointer;
   color: ${({theme}) => theme.darkGrey};
   font-size: ${({theme}) => theme.fontSize.s};
   font-weight: ${({theme}) => theme.bold};
   &:hover {
      background-color: #f5f5f5;
   }
`;

interface IProps {
   placeholder: string;
   disabled: boolean;
   onChange: (value: string) => void;
   onSelect: (value: string) => void;
   value: string;
   options: string[];
   invalid: boolean;
}

const AutocompleteTextInput = (props: IProps) => {
   const {onChange, onSelect, value, disabled, invalid, options, placeholder} = props;
   const [openOptions, setOpenOptions] = React.useState<boolean>(false);
   const [hintOptions, setHintOptions] = React.useState<string[]>(options);

   /**
    * Handles the change event of the input field.
    *
    * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
    */
   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      // Prevent the default form submission behavior.
      e.preventDefault();

      // Create a copy of the options array.
      let setOptions = [...options];

      // If the input value is not empty, filter the options array based on the input value.
      if (e.target.value.length) {
         setOptions = options.filter((option) =>
            option.toLowerCase().includes(e.target.value.toLowerCase())
         );
      }

      // Update the hintOptions state with the filtered options.
      setHintOptions(setOptions);

      // Call the onChange function with the new input value.
      onChange(e.target.value);
   };

   return (
      <AutocompleteWrapper>
         <TextInputField
            placeholder={placeholder}
            onChange={onChangeHandler}
            onFocus={() => setOpenOptions(true)}
            onBlur={() => setTimeout(() => setOpenOptions(false), 100)}
            value={value}
            disabled={disabled}
            invalid={invalid}
         />
         {openOptions && hintOptions.length > 0 && (
            <OptionList tabIndex={0}>
               {hintOptions.map((option, index) => (
                  <OptionItem key={option} tabIndex={index + 1}>
                     <OptionButton
                        role="button"
                        onClick={(e) => {
                           e.preventDefault();
                           setOpenOptions(false);
                           onSelect(option);
                        }}
                     >
                        {option}
                     </OptionButton>
                  </OptionItem>
               ))}
            </OptionList>
         )}
      </AutocompleteWrapper>
   );
};

export default AutocompleteTextInput;
