// export default class User {
//   constructor(
//     userId,
//     userFullName,
//     username,
//     userBirthDate,
//     userGender,
//     userEmail,
//     userPhoneNumber,
//     userAddresses,
//     userRole
//   ) {
//     this.userId = userId;
//     this.username = username;
//     this.userBirthDate = userBirthDate;
//     this.userGender = userGender;
//     this.userEmail = userEmail;
//     this.userPhoneNumber = userPhoneNumber;
//     this.userAddresses = userAddresses;
//     this.userRole = userRole;
//   }
// }
// userId: "",
//     userFullName: "",
//     username: "",
//     userBirthDate: "",
//     userGender: "0",
//     userEmail: "",
//     userPhoneNumber: "",
//     userAddresses: [new Address("", "", "", "")],
//     userRole: "0",
export default class User {
  constructor(username, email, phoneNumber, name, birthDate, gender, address) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.name = name;
    this.birthDate = birthDate;
    this.gender = gender;
    this.address = address;
  }

  getStringDateViLocale() {
    return this.birthDate.toLocaleDateString("vi-VN");
  }
}
