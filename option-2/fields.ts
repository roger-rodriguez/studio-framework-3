export default ({ dataSourceData }) => {
  return {
    fields: [categoryType],
    fieldData: { ...dataSourceData },
  };
};

const categoryType = () => {
  return {
    type: "select",
    label: "Product Category",
    name: "productCategory",
    value: "Mens",
    options: [
      { label: "Mens", value: "Mens" },
      { label: "Womens", value: "Womens" },
    ],
  };
};
