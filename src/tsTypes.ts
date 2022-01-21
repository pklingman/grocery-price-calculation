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

export interface PriceDisplayPropsType {
  costByType: ValueByItemType;
  countByType: ValueByItemType;
  totalCost: number;
  totalSavings: number;
}
