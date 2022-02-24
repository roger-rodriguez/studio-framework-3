import properties from "./properties";
import tools from "./tools";
import fields from "./fields";

export default (app) => {
  app.registerProperties(properties);
  app.registerTools(tools);
  app.registerFields(fields);
};
