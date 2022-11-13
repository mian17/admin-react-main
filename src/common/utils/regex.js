export const colorCodeRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
export const skuRegex = "(?=\\S*[A-Z])(?=\\S*\\d)[A-Z\\d]{10,}";
// export const phoneRegex =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const phoneRegex = /(((\+|)84)|0)([35789])+([0-9]{8})\b/g;
export const noWhiteSpaceRegex = /\s/;
export const userNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
