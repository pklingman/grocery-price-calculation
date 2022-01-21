import React from "react";
import { Divider, Row, Col, Typography, Statistic } from "antd";
import { PriceDisplayPropsType } from "../tsTypes";

export const PriceDisplay: React.FC<PriceDisplayPropsType> = ({
  costByType,
  countByType,
  totalCost,
  totalSavings,
}) => {
  const { Text } = Typography;

  const {
    bread: breadCount,
    milk: milkCount,
    banana: bananaCount,
    apple: appleCount,
  } = countByType;

  const {
    bread: breadCost,
    milk: milkCost,
    banana: bananaCost,
    apple: appleCost,
  } = costByType;

  return (
    <>
      <Row>
        <Col span={8}>
          <Text strong>Item</Text>
        </Col>
        <Col span={8}>
          <Text strong>Quantity</Text>
        </Col>
        <Col span={8}>
          <Text strong>Price</Text>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8}>
          <Text>Milk</Text>
        </Col>
        <Col span={8}>
          <Text>{milkCount}</Text>
        </Col>
        <Col span={8}>
          <Text>${milkCost.toFixed(2)}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text>Bread</Text>
        </Col>
        <Col span={8}>
          <Text>{breadCount}</Text>
        </Col>
        <Col span={8}>
          <Text>${breadCost.toFixed(2)}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text>Apple</Text>
        </Col>
        <Col span={8}>
          <Text>{appleCount}</Text>
        </Col>
        <Col span={8}>
          <Text>${appleCost.toFixed(2)}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text>Banana</Text>
        </Col>
        <Col span={8}>
          <Text>{bananaCount}</Text>
        </Col>
        <Col span={8}>
          <Text>${bananaCost.toFixed(2)}</Text>
        </Col>
      </Row>
      <Divider />
      <Row gutter={10}>
        <Col span={12}>
          <Statistic title="Total Cost" value={`$${totalCost.toFixed(2)}`} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Savings"
            value={`$${totalSavings.toFixed(2)}`}
          />
        </Col>
      </Row>
    </>
  );
};
