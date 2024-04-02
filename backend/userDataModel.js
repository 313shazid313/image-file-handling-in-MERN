const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const userData = mongoose.model("userData", userSchema);
module.exports = userData;
