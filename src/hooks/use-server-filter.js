import { useState } from "react";

const useServerFilter = (setCurrentPage) => {
  const [filter, setFilter] = useState("");
  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return { filter, setFilter, filterChangeHandler };
};
export default useServerFilter;
