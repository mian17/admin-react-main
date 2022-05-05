import { useState } from "react";

const useInput = (checkInputFunc) => {
  const [valueInput, setValueInput] = useState("");
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = checkInputFunc(valueInput);
  const valueHasError = !valueIsValid && valueIsTouched;

  // let errorMessage;
  // if (!valueInput) errorMessage = "Chưa nhập dữ liệu";

  // if (!regex.test(valueInput))

  // Common errors
  // if (customerNameInput.trim() === "")
  //   errorMessage = "Chưa nhập tên khách hàng";
  // if (!VIETNAMESE_REGEX.test(customerNameInput))
  //   errorMessage = "Tên khách hàng không được bao gồm số, ký tự đặc biệt.";

  // const customerInputClasses = customerNameHasError
  //   ? "form-control is-invalid"
  //   : "form-control";

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
