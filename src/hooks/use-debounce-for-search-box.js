import { useEffect } from "react";
import {
  MAXIMUM_SEARCH_KEYWORD_LENGTH_TO_START_SENDING_REQUEST,
  MAXIMUM_SECONDS_TO_START_SENDING_REQUEST,
} from "../common/utils/helperVars";

const useDebounceForSearchBox = (functionToProcess, filter) => {
  useEffect(() => {
    // if (
    //   filter.length > MAXIMUM_SEARCH_KEYWORD_LENGTH_TO_START_SENDING_REQUEST
    // ) {
    //   const getData = setTimeout(functionToProcess, 2000);
    //   return () => clearTimeout(getData);
    // } else {
    //   functionToProcess();
    // }

    if (
      filter.length > MAXIMUM_SEARCH_KEYWORD_LENGTH_TO_START_SENDING_REQUEST
    ) {
      const getData = setTimeout(() => {
        if (
          filter.length > MAXIMUM_SEARCH_KEYWORD_LENGTH_TO_START_SENDING_REQUEST
        ) {
          functionToProcess();
        }
      }, MAXIMUM_SECONDS_TO_START_SENDING_REQUEST);

      return () => clearTimeout(getData);
    } else if (filter.length === 0) {
      functionToProcess();
    }
  }, [functionToProcess, filter]); // IF SOMETHING HAPPENS, RETURN FILTER DEPENDENCY TO filter.length
};
export default useDebounceForSearchBox;
