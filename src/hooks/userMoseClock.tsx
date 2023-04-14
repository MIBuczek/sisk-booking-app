import {useEffect, useState} from 'react';

/**
 * Hook function to track last user click action.
 */
const userMoseClock = () => {
   const [mouseClick, setMouseClick] = useState(0);

   /**
    * Function to set current time ofter each user click.
    */
   const registerUserClick = (): void => {
      setMouseClick(new Date().getTime());
   };

   /**
    * Effect to track mose click event listener.
    */
   useEffect(() => {
      window.addEventListener('click', registerUserClick);
      return () => window.removeEventListener('click', registerUserClick);
   });

   return mouseClick;
};

export default userMoseClock;
