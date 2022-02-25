export default ({ dataSourceData }) => {
  const isOnSale = dataSourceData.product.info.isSale;
  return {
    properties: [productTitle, productImage, isSaleProduct, productOnSaleBadge],
    propertyData: { isOnSale },
  };
};

export const productTitle = ({ propertyData }) => {
  return {
    type: "text",
    name: "Product Title",
    value: propertyData.productTitle,
    fallback: "",
    context: {},
  };
};

export const productImage = ({ propertyData }) => {
  return {
    type: "image",
    name: "Product Image",
    value: propertyData.productImage,
    fallback: "",
    context: {},
  };
};

export const productOnSaleBadge = ({ propertyData }) => {
  return {
    type: "text",
    name: "Product On Sale Badge",
    value: propertyData.isOnSale ? "On Sale" : "",
    fallback: "",
    context: {},
  };
};

export const isSaleProduct = ({ propertyData }) => {
  return {
    type: "boolean",
    name: "Product On Sale?",
    value: Boolean(propertyData.isOnSale),
    fallback: "",
    context: {},
  };
};
