import React from "react";

const RecursiveCategoryOptions = ({
  category,
  childrenRecursive,
  level = 0,
  pattern = "||===",
}) => {
  const hasChildren = childrenRecursive && childrenRecursive.length > 0;

  const recursiveContent =
    hasChildren &&
    childrenRecursive.map((category) => {
      return (
        <RecursiveCategoryOptions
          key={category.name}
          category={category}
          childrenRecursive={category.children_recursive}
          level={level}
        />
      );
    });

  return (
    <>
      <option value={category.id}>{`${pattern.repeat(level)} ${
        category.name
      }`}</option>
      {recursiveContent}
    </>
  );
};
export default RecursiveCategoryOptions;
