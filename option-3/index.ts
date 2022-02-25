import { useDataSourceLoader } from "@movable/datasource";
import { useAppFields } from "@movable/studio";

export async function dataSourceLoader({ contextualData, ds }) {
  const { mi, merged } = contextualData;

  const isProductAvailableInZip = await ds.get("productsByZipCSV", {
    zip: mi.zip,
  });

  if (!isProductAvailableInZip) {
    throw new Error("Product not available in this zip code");
  }

  const appFields = useAppFields();
  const { token } = await ds.get("authAPI", {});
  const { products } = await ds.get("productAPI", {
    auth: token,
    category: merged.mi_category || appFields.productCategory,
  });

  return { ...products[merged.itemIndex] };
}

export async function properties() {
  const product = await useDataSourceLoader();
  const isOnSale = product.info.isSaleItem;
  return {
    properties: [productTitle, productImage, isSaleProduct],
    propertyData: { ...product, isOnSale },
  };
}

export async function fields() {
  const product = await useDataSourceLoader();
  return {
    fields: [categoryType],
    fieldData: { ...product },
  };
}

/****************************
 * App Properties
 ****************************/

const productTitle = ({ propertyData }) => {
  return {
    type: "text",
    name: "Product Title",
    value: propertyData.isOnSale ? "On Sale!" : propertyData.productTitle,
    fallback: "",
    context: {},
  };
};

const productImage = ({ propertyData }) => {
  return {
    type: "image",
    name: "Product Image",
    value: propertyData.productImage,
    fallback: "",
    context: {},
  };
};

const isSaleProduct = ({ propertyData }) => {
  return {
    type: "boolean",
    name: "Product On Sale?",
    value: Boolean(propertyData.isOnSale),
    fallback: "",
    context: {},
  };
};

/****************************
 * App Fields
 ****************************/

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
