export default class Message {
  constructor(hasMessage = false, variant = "", content = "") {
    this.hasMessage = hasMessage;
    this.variant = variant;

    this.content = content;
  }
}
