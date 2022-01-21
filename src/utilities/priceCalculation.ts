export const calculateItemDiscounts = (
  totalItems: number,
  unitPrice: number,
  salePrice: number,
  saleQuantity: number
) => {
  if (totalItems < saleQuantity) {
    return unitPrice * totalItems;
  }

  const totalUnitPricedItems = totalItems % saleQuantity;
  const totalSalePricedItems = totalItems - totalUnitPricedItems;
  const unitPricedItemCost = totalUnitPricedItems * unitPrice;
  const salePricedItemsCost = totalSalePricedItems * (salePrice / saleQuantity);
  return unitPricedItemCost + salePricedItemsCost;
};

export const calculateItemSavings = (
  cost: number,
  costAfterDiscounts: number
) => cost - costAfterDiscounts;
