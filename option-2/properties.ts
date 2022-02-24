export default ({ dataSourceData }) => {
  const isOnSale = false;
  return {
    properties: [productTitle, productImage, isSaleProduct],
    propertyData: { ...dataSourceData, isOnSale },
  };
};

export const productTitle = ({ propertyData }) => {
  const productTitle = propertyData.isOnSale
    ? propertyData.productTitle
    : "Not on sale";

  return {
    type: "text",
    name: "Product Title",
    value: productTitle,
    fallback: "",
    context: {},
  };
};

export const productImage = ({ propertyData }) => {
  const productImage = propertyData.productImage;
  return {
    type: "image",
    name: "Product Image",
    value: productImage,
    context: {},
  };
};

export const isSaleProduct = ({ propertyData }) => {
  return {
    type: "boolean",
    name: "Product On Sale?",
    value: Boolean(propertyData.isOnSale),
    context: {},
  };
};
