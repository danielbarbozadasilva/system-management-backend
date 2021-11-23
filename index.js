const node_environment = process.env.NODE_ENV || "development";

if (node_environment === "development") {
  require("dotenv").config();
}

require("./api/server");


