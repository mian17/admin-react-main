import WarehouseInputs from "./WarehouseInputs";

const WarehouseAdd = (props) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo phiếu nhập kho</h3>
      </div>
      <WarehouseInputs randomId="form" />
    </div>
  );
};
export default WarehouseAdd;
