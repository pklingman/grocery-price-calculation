import React, { useState, useEffect } from "react";
import { Space, Button, List, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import uniqid from "uniqid";

import { PRICES } from "../constants/PRICES";
import { GroceriesType, ShoppingListType, ValueByItemType } from "../tsTypes";
import {
  calculateItemSavings,
  calculateItemDiscounts,
} from "../utilities/priceCalculation";

export const PriceCalculator: React.FC = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [shoppingList, setShoppingList] = useState<ShoppingListType[]>([]);
  const [countByType, setCountByType] = useState<ValueByItemType>({
    bread: 0,
    milk: 0,
    banana: 0,
    apple: 0,
  });
  const [costByType, setCostByType] = useState<ValueByItemType>({
    bread: 0,
    milk: 0,
    banana: 0,
    apple: 0,
  });

  useEffect(() => {
    calculateTotalBill();
  }, [shoppingList]);

  const { Text } = Typography;
  const { Item } = List;
  const {
    bread: breadPricingInfo,
    milk: milkPricingInfo,
    banana: bananaPricingInfo,
    apple: applePricingInfo,
  } = PRICES;
  const {
    unitPrice: breadUnitPrice,
    salePrice: breadSalePrice,
    saleQuantity: breadSaleQuantity,
  } = breadPricingInfo;
  const {
    unitPrice: milkUnitPrice,
    salePrice: milkSalePrice,
    saleQuantity: milkSaleQuantity,
  } = milkPricingInfo;

  const handleClickItem = (item: GroceriesType) => {
    setShoppingList(shoppingList.concat({ groceryType: item, id: uniqid() }));
    setCountByType({ ...countByType, [item]: countByType[item] + 1 });
  };

  const handleRemoveItem = (id: string, item: GroceriesType) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
    setCountByType({ ...countByType, [item]: countByType[item] - 1 });
  };

  const calculateTotalBill = () => {
    const {
      bread: breadCount,
      milk: milkCount,
      banana: bananaCount,
      apple: appleCount,
    } = countByType;
    const breadTotalCostAfterDiscounts = calculateItemDiscounts(
      breadCount,
      breadUnitPrice,
      breadSalePrice,
      breadSaleQuantity
    );
    const milkTotalCostAfterDiscounts = calculateItemDiscounts(
      milkCount,
      milkUnitPrice,
      milkSalePrice,
      milkSaleQuantity
    );
    const bananaTotalCost = bananaCount * bananaPricingInfo.unitPrice;
    const appleTotalCost = appleCount * applePricingInfo.unitPrice;
    const breadSavings = calculateItemSavings(
      breadCount * breadUnitPrice,
      breadTotalCostAfterDiscounts
    );
    const milkSavings = calculateItemSavings(
      milkCount * milkUnitPrice,
      milkTotalCostAfterDiscounts
    );
    setCostByType({
      bread: breadTotalCostAfterDiscounts,
      milk: milkTotalCostAfterDiscounts,
      banana: bananaTotalCost,
      apple: appleTotalCost,
    });
    setTotalCost(
      breadTotalCostAfterDiscounts +
        milkTotalCostAfterDiscounts +
        bananaTotalCost +
        appleTotalCost
    );
    setTotalSavings(breadSavings + milkSavings);
  };

  const resetBill = () => {
    setShoppingList([]);
    setTotalCost(0);
    setTotalSavings(0);
    setCountByType({
      bread: 0,
      milk: 0,
      banana: 0,
      apple: 0,
    });
    setCostByType({
      bread: 0,
      milk: 0,
      banana: 0,
      apple: 0,
    });
  };

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
                  handleRemoveItem(id, groceryType);
                }}
              />
            }
          >
            <Text>{groceryType}</Text>
          </Item>
        )}
      />
      <Space>
        <Button onClick={() => handleClickItem("bread")}>bread</Button>
        <Button onClick={() => handleClickItem("milk")}>milk</Button>
        <Button onClick={() => handleClickItem("banana")}>banana</Button>
        <Button onClick={() => handleClickItem("apple")}>apple</Button>
      </Space>
      <Button type="primary" onClick={calculateTotalBill}>
        Calculate Total Price
      </Button>
      <Button danger onClick={resetBill}>
        Clear list
      </Button>
      <Text>
        Total Price: {totalCost.toFixed(2)}, Total Savings:{" "}
        {totalSavings.toFixed(2)}
        Apple: {costByType.apple}
      </Text>
    </>
  );
};
