const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const employeeSchema = mongoose.Schema({  
  username: {
    type: String,
    required: true,    
    unique: true,
  },  
  name: {
    type: String,
    required: true,
  },
  attendantId: [{
      type: ObjectId,
      ref: "Attendant",
    }],
});

module.exports = mongoose.model("Employee", employeeSchema);
