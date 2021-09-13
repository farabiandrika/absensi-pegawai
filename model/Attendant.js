const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const attendantSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  employeeId: {
    type: ObjectId,
    ref: "Employee",
  },
});

module.exports = mongoose.model("Attendant", attendantSchema);
