export default function transformCategoryInputsFormData(
  name,
  parentCategory,
  image
) {
  const data = new FormData();
  data.append("name", name);
  data.append("parent_category_id", parentCategory);
  data.append("image", image);

  return data;
}
