export enum GroceriesEnum {
  Bread = "Bread",
  Milk = "Milk",
  Banana = "Banana",
  Apple = "Apple",
}

export interface ShoppingListType {
  groceryType: GroceriesEnum;
  id: string;
}
