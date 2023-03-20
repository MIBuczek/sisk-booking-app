import { useEffect, useState } from 'react';

/**
 * Height order function to current set scroll position.
 */
const useScrollPosition = () => {
   const [scrollPosition, setScrollPosition] = useState(0);

   /**
    * Function to get windows pag Y data and set current position.
    */
   const updatePosition = () => {
      setScrollPosition(window.scrollY);
   };

   useEffect(() => {
      window.addEventListener('scroll', updatePosition);
      return () => window.removeEventListener('scroll', updatePosition);
   }, []);

   return scrollPosition;
};

export default useScrollPosition;
