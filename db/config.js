const node_environment = process.env.NODE_ENV || "development";

if (node_environment === "development") {
  require("dotenv").config();
}

module.exports = {
  uri: `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`,
};
