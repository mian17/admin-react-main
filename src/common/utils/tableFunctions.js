export function copyInfoHandler(valueObj) {
  let readyForClipboard = "";

  for (const property in valueObj) {
    if (property === "functions") continue;
    readyForClipboard += `${valueObj[property]}\t`;
  }
  navigator.clipboard.writeText(readyForClipboard).then(() => {
    alert("Đã copy nội dung hàng của bảng!");
  });
}
