import React, { useState } from "react";
import { Button, List } from "antd";
import uniqid from "uniqid";

import { PRICES } from "../constants/PRICES";
import { GroceriesEnum, ShoppingListType } from "../tsTypes";

export const PriceCalculator: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [shoppingList, setShoppingList] = useState<ShoppingListType[]>([]);

  const handleClickItem = (item: GroceriesEnum) => {
    setShoppingList(shoppingList.concat({ groceryType: item, id: uniqid() }));
  };

  console.log("SHOPPING LIST", shoppingList);

  return (
    <>
      <Button onClick={() => handleClickItem(GroceriesEnum.Bread)}>
        Bread
      </Button>
      <Button onClick={() => handleClickItem(GroceriesEnum.Milk)}>Milk</Button>
      <Button onClick={() => handleClickItem(GroceriesEnum.Banana)}>
        Banana
      </Button>
      <Button onClick={() => handleClickItem(GroceriesEnum.Apple)}>
        Apple
      </Button>
    </>
  );
};
