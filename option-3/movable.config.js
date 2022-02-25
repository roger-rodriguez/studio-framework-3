export default {
  name: "Product Category App",
  integration_ids: ["1234", "5678"],
  dataSources: {
    authAPI: "1b110e70970c4528da70c98e097c2fa0",
    productAPI: "3b580e70970c4528da70c98e097c2fa0",
    productRecommendationAPI: "4b444e70970c4528da70c98e097c2fa0",
  },
  contextualData: {
    mi: (opts) => [opts.zip, opts.campaign_id],
    merged: [{ productIndex: "mi_product_index", productSku: "mi_product_sku" }],
  },
  captureOptions: (opts) => ({
    timeout: "2s",
    cache_ttl: opts.cache_ttl,
  }),
};
