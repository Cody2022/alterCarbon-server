const mongoose = require("./mongoose");


const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  electricity: { type: Number, default: 0 },
  naturalGas: { type: Number, default: 0 },
  carMiles: { type: Number, default: 0 },
  plasticWaste: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.model("User", userSchema);

const createUser = async (newUserData) => {
  let result = await User.create(newUserData);
  return result;
};


 module.exports = { createUser };
