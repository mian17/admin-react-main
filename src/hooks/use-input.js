import { useState } from "react";

const useInput = (checkInputFunc) => {
  const [valueInput, setValueInput] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = checkInputFunc(valueInput);
  const valueHasError = !valueIsValid && valueIsTouched;

  const changeValueHandler = (e) => {
    setValueInput(e.target.value);
  };

  const blurValueHandler = () => {
    setValueIsTouched(true);
  };
  const resetValue = () => {
    setValueInput("");
    setValueIsTouched(false);
  };

  return {
    value: valueInput,
    isValid: valueIsValid,
    hasError: valueHasError,

    changeValueHandler,
    blurValueHandler,
    resetValue,
  };
};
export default useInput;
