'use client'; // Marca este componente como cliente

import { useEffect } from 'react';

const TabTitleChanger = () => {
  useEffect(() => {
    let originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Ey, volvé!";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Limpia el event listener al desmontar el componente
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // No renderiza nada visible
};

export default TabTitleChanger;
