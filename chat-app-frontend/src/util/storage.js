import { useEffect, useState } from "react";

function useCurrentLocalState(defaultValue, key){
  const [state, setState] = useState(() => {
    const currentValue = localStorage.getItem(key);
	
    if (currentValue !== null) {
      return currentValue;
    }
    return defaultValue;
  });

  useEffect(() => {
	  localStorage.setItem(key, state);	  
  }, [key, state]);

  return [state, setState];
}

export default useCurrentLocalState;
