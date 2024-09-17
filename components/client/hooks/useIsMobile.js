// import {useState, useEffect, useLayoutEffect} from 'react';

// export const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(
//     typeof window !== 'undefined' ? window.innerWidth <= 768 : true
//   );
//
//   useLayoutEffect(() => {
//     const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
//     const isMobileUserAgent = Boolean(window.navigator.userAgent.match(mobileRegex));
//
//     const handleResize = () => {
//       const isMobileWidth = window.innerWidth <= 768;
//       setIsMobile(isMobileWidth || isMobileUserAgent);
//     };
//
//     handleResize();
//
//     window.addEventListener('resize', handleResize);
//
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//
//   return isMobile;
// };

import {useEffect, useState} from "react";

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    const isMobileUserAgent = Boolean(userAgent.match(mobileRegex));

    const handleResize = () => {
      const isMobileWidth = window.innerWidth <= 768;
      setIsMobile(isMobileWidth || isMobileUserAgent);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}