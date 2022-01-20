import React, { useState } from "react";
import { Space, Button, List, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import uniqid from "uniqid";

import { PRICES } from "../constants/PRICES";
import { GroceriesType, ShoppingListType, CountByItemType } from "../tsTypes";

export const PriceCalculator: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [shoppingList, setShoppingList] = useState<ShoppingListType[]>([]);
  const [countByItem, setCountByItem] = useState<CountByItemType>({
    bread: 0,
    milk: 0,
    banana: 0,
    apple: 0,
  });

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
    setCountByItem({ ...countByItem, [item]: countByItem[item] + 1 });
  };

  const handleRemoveItem = (id: string, item: GroceriesType) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
    setCountByItem({ ...countByItem, [item]: countByItem[item] - 1 });
  };

  const calculateItemDiscounts = (
    totalItems: number,
    unitPrice: number,
    salePrice: number,
    saleQuantity: number
  ) => {
    if (totalItems < saleQuantity) return unitPrice * totalItems;
    else {
      const totalUnitPricedItems = totalItems % saleQuantity;
      const totalSalePricedItems = totalItems - totalUnitPricedItems;
      const unitPricedItemCost = totalUnitPricedItems * unitPrice;
      const salePricedItemsCost =
        totalSalePricedItems * (salePrice / saleQuantity);
      return unitPricedItemCost + salePricedItemsCost;
    }
  };

  const calculateItemSavings = (cost: number, costAfterDiscounts: number) =>
    cost - costAfterDiscounts;

  const calculateTotalBill = () => {
    const {
      bread: breadCount,
      milk: milkCount,
      banana: bananaCount,
      apple: appleCount,
    } = countByItem;
    const breadTotalPriceAfterDiscounts = calculateItemDiscounts(
      breadCount,
      breadUnitPrice,
      breadSalePrice,
      breadSaleQuantity
    );
    console.log("bread PRICE AFTER DISCOUNTs", breadTotalPriceAfterDiscounts);
    const milkTotalPriceAfterDiscounts = calculateItemDiscounts(
      milkCount,
      milkUnitPrice,
      milkSalePrice,
      milkSaleQuantity
    );
    const bananaTotalPrices = bananaCount * bananaPricingInfo.unitPrice;
    const appleTotalPrices = appleCount * applePricingInfo.unitPrice;
    const breadSavings = calculateItemSavings(
      breadCount * breadUnitPrice,
      breadTotalPriceAfterDiscounts
    );
    const milkSavings = calculateItemSavings(
      milkCount * milkUnitPrice,
      milkTotalPriceAfterDiscounts
    );
    setTotalPrice(
      breadTotalPriceAfterDiscounts +
        milkTotalPriceAfterDiscounts +
        bananaTotalPrices +
        appleTotalPrices
    );
    setTotalSavings(breadSavings + milkSavings);
  };

  const resetBill = () => {
    setShoppingList([]);
    setTotalPrice(0);
    setTotalSavings(0);
    setCountByItem({
      bread: 0,
      milk: 0,
      banana: 0,
      apple: 0,
    });
  };

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
        Total Price: {totalPrice}, Total Savings: {totalSavings}
      </Text>
    </>
  );
};
