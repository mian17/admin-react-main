export default class Category {
  constructor(id, name, img, parentCategory = "") {
    this.id = id;
    this.name = name;
    this.img = img;
    this.parentCategory = parentCategory;
  }
}
