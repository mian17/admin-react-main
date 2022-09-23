export default class Address {
  constructor(
    id,
    receiverName,
    address,
    phoneNumber,
    addressCategory,
    defaultAddress
  ) {
    this.id = id;
    this.receiverName = receiverName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.addressCategory = addressCategory;
    this.defaultAddress = defaultAddress;
  }
}
