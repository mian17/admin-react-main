import MerchantInputs from "./MerchantInputs";

const MerchantAdd = (props) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo nhà bán</h3>
      </div>
      <MerchantInputs randomId="form" />
    </div>
  );
};
export default MerchantAdd;
