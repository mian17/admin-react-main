import {useCallback, useState} from "react";
import apiClient from "../api";

// functionToProcess parameter must RETURN something
const useFetchingTableData = (apiUrl, setData, functionToProcess, filter) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [noFoundSearchResult, setNoFoundSearchResult] = useState(false);

  console.log(apiUrl);
  const fetchData = useCallback(async () => {
    setHasError(false);
    setNoFoundSearchResult(false);
    setIsLoading(true);
    setData([]);

    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(`${apiUrl}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      // console.log(response);
      const transformedData = functionToProcess(response);
      if (transformedData.length === 0 && filter.length > 0)
        setNoFoundSearchResult(true);

      // console.log(transformedData);
      // console.log(response);
      // console.log(transformedData);
      setData(transformedData);
    } catch (error) {
      console.log(error);
      setHasError(true);
      // alert("Đã có lỗi xảy ra trong quá trình tải các danh mục.");
    }
    setIsLoading(false);
  }, [apiUrl, setData]); // DO NOT UPDATE THIS DEPENDENCY

  return {
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    noFoundSearchResult,
    setNoFoundSearchResult,
    fetchData,
  };
};
export default useFetchingTableData;
