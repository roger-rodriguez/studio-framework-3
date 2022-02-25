import { useDataSource } from "@movable/datasource";
import {
  useParams,
  useMIContext,
  useUserContext,
  useFields,
  logger,
} from "@movable/studio";

export default (req, res) => {
  const { mi_item_index } = useParams(req);
  const { clientId, campaignId } = useMIContext(req);
  const { lat, lon } = useUserContext(req);
  const { value } = useFields({ name: "productCategory" });

  const productCategory = value === "Mens" ? "m" : "w";
  const { data, status } = useDataSource({
    key: "1234",
    lat,
    lon,
    cat: productCategory,
  });

  if (status !== 200) {
    logger.metric({ client: clientId, campaign: campaignId, msg: "error" });
    return res.status(500).json({ dataSourceData: {}, contextData: {} });
  }

  logger.debug(`response from api: `, data);

  return res.status(200).json({
    dataSourceData: data.products[mi_item_index],
    contextData: { campaignId },
  });
};
