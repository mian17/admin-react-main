import {useCallback, useContext} from "react";
import apiClient from "../api";
import Message from "../common/utils/Message";
import MessageContext from "../store/message-context";

// functionToProcess parameter must RETURN something
const useFetchingFormData = (
  apiUrl,
  setData,
  functionToProcess,
  errorMessage,
  successMessage
) => {
  const { setMessage } = useContext(MessageContext);

  const fetchData = useCallback(async () => {
    // setData([]);
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(`${apiUrl}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const transformedData = functionToProcess(response);
      console.log(transformedData);
      setData(transformedData);
      // setMessage(new Message(true, "success", ""));
    } catch (error) {
      setMessage(
        new Message(
          true,
          "danger",
          "Không lấy được danh sách các danh mục sản phẩm cho form! Bạn hãy thử refresh lại trang."
        )
      );
    }
  }, [apiUrl, setData]);

  return {
    fetchData,
  };
};

export default useFetchingFormData;
