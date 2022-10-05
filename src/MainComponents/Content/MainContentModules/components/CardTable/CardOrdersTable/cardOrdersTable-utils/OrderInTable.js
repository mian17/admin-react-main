export default class OrderInTable {
  constructor(
    orderUuid,
    receiverName,
    receiverPhoneNumber,
    receiverAddress,
    orderStatus,
    paymentStatus,
    totalMoney
  ) {
    this.orderUuid = orderUuid;
    this.receiverName = receiverName;
    this.receiverPhoneNumber = receiverPhoneNumber;
    this.receiverAddress = receiverAddress;
    this.orderStatus = orderStatus;
    this.paymentStatus = paymentStatus;
    this.totalMoney = totalMoney;
  }
}
