import CategoryForTable from "../../MainComponents/Content/MainContentModules/components/Forms/Category/categoryForm-utils/CategoryForTable";

export function recursiveChildrenCategoryAddition(
  category,
  parentCategoryReadyToPush,
  transformedCategories,
  level,
  pattern
) {
  level++;
  category.children_recursive.forEach((childCategory) => {
    const childParentCategoryReadyToPush = new CategoryForTable(
      childCategory.id,
      `${pattern.repeat(level)} ${childCategory.name}`
    );
    transformedCategories.push(childParentCategoryReadyToPush);

    recursiveChildrenCategoryAddition(
      childCategory,
      childParentCategoryReadyToPush,
      transformedCategories,
      level,
      pattern
    );
  });
}
export const recursiveChildrenCategoryAdditionForFetching = (
  categoriesResponse
) => {
  let transformedCategories = [];

  categoriesResponse.data.forEach((category) => {
    const parentCategoryReadyToPush = new CategoryForTable(
      category.id,
      category.name
    );
    transformedCategories.push(parentCategoryReadyToPush);

    recursiveChildrenCategoryAddition(
      category,
      parentCategoryReadyToPush,
      transformedCategories,
      0,
      "||==="
    );
  });
  return transformedCategories;
};
