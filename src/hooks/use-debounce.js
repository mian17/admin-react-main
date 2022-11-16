import { useEffect } from "react";

const useDebounce = (functionToProcess) => {
  useEffect(() => {
    const getData = setTimeout(functionToProcess, 2000);
    return () => clearTimeout(getData);
  }, [functionToProcess]);
};
export default useDebounce;
