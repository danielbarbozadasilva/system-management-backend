const db = require("../../db/config");

const categoria = require("./add-category");
const likeCli = require("./add-clientLikeProvider");
const produto = require("./add-product");
const likeForn = require("./add-providerLikeProduct");
const usuarios = require("./add-users");

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const node_environment = process.env.NODE_ENV || "development";
if (node_environment === "development") {
  require("dotenv").config();
}
