import React, { useState, useEffect, useCallback } from "react";
import { Space, Button, List, Typography, Layout } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import uniqid from "uniqid";
import "../App.css";
import { PriceDisplay } from "./PriceDisplay";
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

  const { Text, Title } = Typography;
  const { Item } = List;
  const { Header, Footer, Content } = Layout;

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

  const {
    bread: breadCount,
    milk: milkCount,
    banana: bananaCount,
    apple: appleCount,
  } = countByType;

  const calculateTotalBill = useCallback(() => {
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
  }, [
    applePricingInfo.unitPrice,
    bananaPricingInfo.unitPrice,
    breadSalePrice,
    breadSaleQuantity,
    breadUnitPrice,
    appleCount,
    bananaCount,
    breadCount,
    milkCount,
    milkSalePrice,
    milkSaleQuantity,
    milkUnitPrice,
  ]);

  useEffect(() => {
    calculateTotalBill();
  }, [shoppingList, calculateTotalBill]);

  const handleClickItem = (item: GroceriesType) => {
    setShoppingList(shoppingList.concat({ groceryType: item, id: uniqid() }));
    setCountByType({ ...countByType, [item]: countByType[item] + 1 });
  };

  const handleRemoveItem = (id: string, item: GroceriesType) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
    setCountByType({ ...countByType, [item]: countByType[item] - 1 });
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
      <Layout className="top-layout">
        <Header className="header">
          <Title id="header-title" level={3}>
            Calculate your grocery bill
          </Title>
        </Header>
        <Layout className="content-layout">
          <Content className="list-button-content">
            <List
              className="list"
              locale={{
                emptyText: "Add groceries to your list from the choices below.",
              }}
              dataSource={shoppingList}
              size="small"
              renderItem={({ groceryType, id }) => (
                <Item
                  className="list-item"
                  key={`list-${id}`}
                  extra={
                    <Button
                      className="icon-button"
                      type="ghost"
                      icon={<CloseOutlined />}
                      onClick={() => {
                        handleRemoveItem(id, groceryType);
                      }}
                    />
                  }
                >
                  <Text>{`${groceryType[0].toUpperCase()}${groceryType.slice(
                    1
                  )}`}</Text>
                </Item>
              )}
            />

            <Space className="space">
              <Button
                className="item-button"
                onClick={() => handleClickItem("bread")}
              >
                Bread
              </Button>
              <Button
                className="item-button"
                onClick={() => handleClickItem("milk")}
              >
                Milk
              </Button>
              <Button
                className="item-button"
                onClick={() => handleClickItem("banana")}
              >
                Banana
              </Button>
              <Button
                className="item-button"
                onClick={() => handleClickItem("apple")}
              >
                Apple
              </Button>
              <Button className="danger-button" danger onClick={resetBill}>
                Clear list
              </Button>
            </Space>
          </Content>
          <Content className="display-content">
            <PriceDisplay
              countByType={countByType}
              costByType={costByType}
              totalCost={totalCost}
              totalSavings={totalSavings}
            />
          </Content>
        </Layout>

        <Footer></Footer>
      </Layout>
    </>
  );
};
