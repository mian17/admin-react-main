import CategoryInputs from "./CategoryInputs";

const CategoryAdd = () => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm danh mục</h3>
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
      <CategoryInputs ramdonId="category" />
    </div>
  );
};

export default CategoryAdd;
