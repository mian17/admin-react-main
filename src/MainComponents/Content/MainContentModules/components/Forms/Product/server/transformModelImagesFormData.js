export default function transformModelImagesFormData(
  productId,
  modelId,
  images
) {
  const data = new FormData();

  data.append("product_id", productId);
  data.append("model_id", modelId);

  images.forEach((image, index) => {
    data.append(`images[${index}]`, image);
  });
  return data;
}
