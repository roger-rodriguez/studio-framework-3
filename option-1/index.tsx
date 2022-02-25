import React from "react";
import { Studio, ToolBar, Tool, Canvas, Fallback, Property, Image } from "@movable/studio";
import { useDataSource } from "@movable/datasource";
import { log } from "@movable/app-bridge-react";


export default (app) => {
  app.registerProperties(properties);
  app.registerTools(tools);
}

// server only code
export const dataSource = ({ miCxt }) => {
  const { data, error } = useDataSource({ id: miCxt.id });
  return {
    data,
  };
}

export const tools = ({ dataSourceData }) => {
  return {
    tools: [],
    toolData: {},
  }
}


// Client side code
export const properties = ({ dataSourceData }) => {
  const isOnSale = false;
  return {
    properties: [productTitle, productImage, isSaleProduct],
    propertyData: { ...dataSourceData, isOnSale }
  }

}

export const productTitle = ({ propertyData }) => {
  const productTitle = propertyData.isOnSale ? propertyData.productTitle : 'Not on sale';
  // return <Property name="Product Title" value={productTitle}/>
  return { type: "text", name: "Product Title", value: productTitle, fallback: "", context: {} }

}

export const productImage = ({ propertyData }) => {
  const productImage = propertyData.productImage;
  return { type: "image", name: "Product Image", value: productImage, context: {} };
}

export const isSaleProduct = ({ propertyData }) => {
  return { type: "boolean", name: "Product On Sale?", value: Boolean(propertyData.isOnSale), context: {} };
}