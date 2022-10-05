import ImageModelInputs from "./ImageModelInputs";

const ImageModelAdd = () => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm hình ảnh cho kiểu loại của sản phẩm</h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus"></i>
          </button>
        </div>
      </div>
      <ImageModelInputs randomId="image" />
    </div>
  );
};
export default ImageModelAdd;
