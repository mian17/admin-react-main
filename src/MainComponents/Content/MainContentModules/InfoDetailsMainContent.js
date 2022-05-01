import InfoDetails from "./components/InfoDetails/InfoDetails";

const infoDetailsArr = [
  {
    id: 0,
    num: 150,
    unit: "",
    labelDataType: "Đơn hàng mới",
    icon: "fas fa-shopping-bag",
    bootstrapBackground: "bg-info",
  },
  {
    id: 1,
    num: 53,
    unit: "%",
    labelDataType: "Bounce Rate",
    icon: "far fa-chart-bar",
    bootstrapBackground: "bg-success",
  },
  {
    id: 2,
    num: 150,
    unit: "",
    labelDataType: "Lượt đăng ký mới",
    icon: "fas fa-user-plus",
    bootstrapBackground: "bg-warning",
  },
  {
    id: 3,
    num: 65,
    unit: "",
    labelDataType: "Khách hàng mới",
    icon: "fas fa-users",
    bootstrapBackground: "bg-danger",
  },
];

const InfoDetailsMainContent = () => {
  return (
    <div className="row">
      {infoDetailsArr.map((info) => (
        <InfoDetails
          key={info.id}
          num={info.num}
          unit={info.unit}
          labelDataType={info.labelDataType}
          icon={info.icon}
          bootstrapBackground={info.bootstrapBackground}
        />
      ))}
    </div>
  );
};
export default InfoDetailsMainContent;
