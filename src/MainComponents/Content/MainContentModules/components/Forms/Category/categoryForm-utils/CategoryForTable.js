export default class CategoryForTable {
  constructor(id, name, children) {
    this.id = id;
    this.name = name;
    this.children = children; // Child categories of a parent category
  }
}
