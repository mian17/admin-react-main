export default class Order {
  constructor(
    receiverName,
    receiverAddress,
    receiverPhoneNumber,
    receiverEmail
  ) {
    this.receiverName = receiverName;
    this.receiverAddress = receiverAddress;
    this.receiverPhoneNumber = receiverPhoneNumber;
    this.receiverEmail = receiverEmail;
  }
}
