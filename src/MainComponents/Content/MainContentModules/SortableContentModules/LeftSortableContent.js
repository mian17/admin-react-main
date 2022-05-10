import CardDirectChat from "../components/CardDirectChat/CardDirectChat";
import CardSales from "../components/CardSales/CardSales";
import CardTodo from "../components/CardTodo/CardTodo";

const LeftSortableContent = () => {
  return (
    <section className="col-lg-7 connectedSortable">
      <CardSales />
      <CardDirectChat />
      <CardTodo />
    </section>
  );
};

export default LeftSortableContent;
