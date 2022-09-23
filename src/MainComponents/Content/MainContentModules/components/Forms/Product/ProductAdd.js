import ProductInputs from "./ProductInputs";

const ProductAdd = () => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo sản phẩm</h3>
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
      <ProductInputs />
    </div>
  );
};
export default ProductAdd;
