const adminSchema = {
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
};

module.exports = adminSchema;
