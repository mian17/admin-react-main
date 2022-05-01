import CardCalender from "../components/CardCalender/CardCalender";
import CardMap from "../components/CardMap/CardMap";
import CardSalesGraph from "../components/CardSalesGraph/CardSalesGraph";

const RightSortableContent = () => {
  return (
    <section className="col-lg-5 connectedSortable">
      <CardMap />
      <CardSalesGraph />
      <CardCalender />
    </section>
  );
};

export default RightSortableContent;
