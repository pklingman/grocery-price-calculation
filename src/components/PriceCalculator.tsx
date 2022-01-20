import React, { useState } from "react";
import { Button, List } from "antd";

import { PRICES } from "../constants/PRICES";

export const PriceCalculator: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingList, setShoppingList] = useState<String[]>([]);

  return (
    <>
      <Button type="primary">A nice test button </Button>
    </>
  );
};
