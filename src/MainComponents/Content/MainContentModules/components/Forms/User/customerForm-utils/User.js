export default class User {
  constructor(
    userId,
    userFullName,
    username,
    userBirthDate,
    userGender,
    userEmail,
    userPhoneNumber,
    userAddresses,
    userRole
  ) {
    this.userId = userId;
    this.username = username;
    this.userBirthDate = userBirthDate;
    this.userGender = userGender;
    this.userEmail = userEmail;
    this.userPhoneNumber = userPhoneNumber;
    this.userAddresses = userAddresses;
    this.userRole = userRole;
  }
}
// userId: "",
//     userFullName: "",
//     username: "",
//     userBirthDate: "",
//     userGender: "0",
//     userEmail: "",
//     userPhoneNumber: "",
//     userAddresses: [new Address("", "", "", "")],
//     userRole: "0",
