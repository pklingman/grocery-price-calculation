export enum GroceriesEnum {
  Bread = "bread",
  Milk = "milk",
  Banana = "banana",
  Apple = "apple",
}

export interface ShoppingListType {
  groceryType: GroceriesEnum;
  id: string;
}
