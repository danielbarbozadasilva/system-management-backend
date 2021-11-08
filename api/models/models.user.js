const user_schema = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

module.exports = user_schema;
