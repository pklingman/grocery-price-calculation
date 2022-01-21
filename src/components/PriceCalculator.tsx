import React, { useState, useEffect, useCallback } from "react";
import {
  Space,
  Button,
  List,
  Typography,
  Layout,
  Statistic,
  Row,
  Col,
} from "antd";
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

  const { Text, Title } = Typography;
  const { Item } = List;
  const { Header, Footer, Sider, Content } = Layout;

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
      <Layout style={{ width: 1000 }}>
        <Header style={{ background: "#189AA6" }}>
          <Title style={{ color: "white", marginTop: 10 }} level={3}>
            Calculate your grocery bill
          </Title>
        </Header>
        <Layout style={{ display: "flex", flexDirection: "row" }}>
          <Content style={{ display: "flex", flexDirection: "column" }}>
            <List
              locale={{
                emptyText: "Add groceries to your list from the choices below.",
              }}
              style={{
                width: "60%",
                height: 600,
                overflow: "scroll",
                margin: 10,
                background: "#E5EAEA",
              }}
              dataSource={shoppingList}
              size="small"
              renderItem={({ groceryType, id }) => (
                <Item
                  key={`list-${id}`}
                  style={{ background: "#D7EDEF" }}
                  extra={
                    <Button
                      type="ghost"
                      icon={<CloseOutlined />}
                      style={{ border: 0, color: "gray" }}
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

            <Space
              style={{ display: "flex", flexDirection: "row", margin: 20 }}
            >
              <Button
                style={{ width: 80 }}
                onClick={() => handleClickItem("bread")}
              >
                Bread
              </Button>
              <Button
                style={{ width: 80 }}
                onClick={() => handleClickItem("milk")}
              >
                Milk
              </Button>
              <Button
                style={{ width: 80 }}
                onClick={() => handleClickItem("banana")}
              >
                Banana
              </Button>
              <Button
                style={{ width: 80 }}
                onClick={() => handleClickItem("apple")}
              >
                Apple
              </Button>
              <Button style={{ width: 80 }} danger onClick={resetBill}>
                Clear list
              </Button>
            </Space>
          </Content>
          <Content>Hi!</Content>
        </Layout>

        <Footer>
          <Text>
            Total Price: {totalCost.toFixed(2)}, Total Savings:{" "}
            {totalSavings.toFixed(2)}
          </Text>
        </Footer>
      </Layout>
    </>
  );
};
