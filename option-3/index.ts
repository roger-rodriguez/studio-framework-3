// import { useDataLoader } from "@movable/datasource";
import {
  useAppDataSources,
  useAppFields,
  useAppProperties,
  useMIContextualData,
  useDynamicFields,
  useDataLoader,
} from "@movable/studio";

/****************************
 * Export: Data Loader
 ****************************/
export const dataLoader = async () => {
  const appFields = useAppFields();
  const appProperties = useAppProperties();
  const appDataSources = useAppDataSources();
  const mi = useMIContextualData();

  let recommendedProductSku = appFields.productRecommendationSku;

  if (!recommendedProductSku) {
    console.log("...getting product recommendation");
    recommendedProductSku = await appDataSources("productRecommendationAPI", {
      zip: mi.zip,
      campaignId: mi.campaignId,
    });
  }

  const { token } = await appDataSources("authAPI", {});
  const { products } = await appDataSources("productAPI", {
    auth: token,
    sku: recommendedProductSku,
  });
  const selectedProduct =
    products[appProperties.productTitle.context.productIndex];

  return { ...selectedProduct };
};

/****************************
 * Export: App Properties
 ****************************/
export const properties = async () => {
  const product = await useDataLoader();
  const isOnSale = product.info.isSaleItem;
  return {
    properties: [productTitle, productImage],
    propertyData: { ...product, isOnSale },
  };
};

/****************************
 * Export: App Fields
 ****************************/
export const fields = async () => {
  const product = await useDataLoader();
  return {
    fields: [productCategory, productRecommendationSku],
    fieldData: { ...product },
  };
};

/****************************
 * App Properties Declarations
 ****************************/

const productTitle = ({ propertyData }) => {
  const { productIndex } = useDynamicFields();
  return {
    type: "text",
    name: "productTitle",
    label: "Product Title",
    value: propertyData.isOnSale ? "On Sale!" : propertyData.productTitle,
    fallback: "",
    context: [
      {
        type: "select",
        name: "productIndex",
        label: "Product Index",
        description: "Which product index to display",
        value: productIndex ? productIndex : "0",
        options: [
          { value: "0", label: "First" },
          { value: "1", label: "Second" },
        ],
      },
    ],
  };
};

const productImage = ({ propertyData }) => {
  const { productCategory } = useAppFields();
  const { productIndex } = useDynamicFields();
  return {
    type: "image",
    name: "productImage",
    label: "Product Image",
    value:
      productCategory === "mens"
        ? propertyData.productImages["200"]
        : propertyData.productImages["300"],
    fallback: "",
    context: [
      {
        type: "select",
        name: "productIndex",
        label: "Product Index",
        description: "Which product index to display",
        value: productIndex ? productIndex : "0",
        options: [
          { value: "0", label: "First" },
          { value: "1", label: "Second" },
        ],
      },
    ],
  };
};

/****************************
 * App Fields Declarations
 ****************************/

const productCategory = () => {
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

const productRecommendationSku = () => {
  const { productSku } = useDynamicFields();
  return {
    type: "text",
    label: "Product Recommendation Sku",
    name: "productRecommendationSku",
    value: productSku ? productSku : "",
  };
};
