import { backendServerPath } from "../../../../../../../utilities/backendServerPath";

export default class Banner {
  constructor(title, subtitle, url, image) {
    this.title = title;
    this.subtitle = subtitle;
    this.url = backendServerPath + url;
    this.image = image;
  }
}
