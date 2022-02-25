export default {
  name: "Product Category App",
  integration_ids: ["1234", "5678"],
  client_id: "5501",
  dataSources: {
    authAPI: "1b110e70970c4528da70c98e097c2fa0",
    productAPI: "3b580e70970c4528da70c98e097c2fa0",
    productsByZipCSV: "4b444e70970c4528da70c98e097c2fa0",
  },
  contextualData: {
    mi: (opts) => [opts.zip, opts.campaign_id],
    merged: [{ itemIndex: "mi_item_index" }],
  },
  captureOptions: (opts) => ({
    timeout: "2s",
    cache_ttl: opts.cache_ttl,
  }),
};
