export type GroceriesType = "bread" | "milk" | "banana" | "apple";

export interface ShoppingListType {
  groceryType: GroceriesType;
  id: string;
}

export interface ValueByItemType {
  bread: number;
  milk: number;
  banana: number;
  apple: number;
}
