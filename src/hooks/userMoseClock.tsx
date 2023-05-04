import {useEffect, useState} from 'react';

/**
 * Hook function to track last user click action.
 */
const userMouseClick = () => {
   const [mouseClick, setMouseClick] = useState(new Date().getTime());

   /**
    * Function to set current time ofter each user click.
    */
   const registerUserClick = (): void => {
      setMouseClick(new Date().getTime());
   };

   /**
    * Effect to track mouse click event listener.
    */
   useEffect(() => {
      window.addEventListener('click', registerUserClick);
      return () => window.removeEventListener('click', registerUserClick);
   });

   return mouseClick;
};

export default userMouseClick;
