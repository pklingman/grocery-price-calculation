import React, { useState } from "react";
import { Space, Button, List, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import uniqid from "uniqid";

import { PRICES } from "../constants/PRICES";
import { GroceriesEnum, ShoppingListType } from "../tsTypes";

export const PriceCalculator: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [shoppingList, setShoppingList] = useState<ShoppingListType[]>([]);

  const { Text } = Typography;
  const { Item } = List;
  const { Bread, Milk, Banana, Apple } = GroceriesEnum;

  const handleClickItem = (item: GroceriesEnum) => {
    setShoppingList(shoppingList.concat({ groceryType: item, id: uniqid() }));
  };

  const handleRemoveItem = (id: string) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const handleCalculateTotal = () => {};

  console.log("SHOPPING LIST", shoppingList);

  return (
    <>
      <List
        bordered
        locale={{
          emptyText: "Add groceries to your list from the choices below",
        }}
        style={{ width: "50%", height: 600, overflow: "scroll" }}
        dataSource={shoppingList}
        size="small"
        renderItem={({ groceryType, id }) => (
          <Item
            key={`list-${id}`}
            extra={
              <Button
                type="ghost"
                icon={<CloseOutlined />}
                style={{ border: 0, color: "lightgray" }}
                onClick={() => {
                  handleRemoveItem(id);
                }}
              />
            }
          >
            <Text>{groceryType}</Text>
          </Item>
        )}
      />
      <Space>
        <Button onClick={() => handleClickItem(Bread)}>Bread</Button>
        <Button onClick={() => handleClickItem(Milk)}>Milk</Button>
        <Button onClick={() => handleClickItem(Banana)}>Banana</Button>
        <Button onClick={() => handleClickItem(Apple)}>Apple</Button>
      </Space>
    </>
  );
};
