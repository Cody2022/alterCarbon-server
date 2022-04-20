const mongoose = require("./mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  electricity: { type: Number, default: 0 },
  naturalGas: { type: Number, default: 0 },
  carMiles: { type: Number, default: 0 },
  plasticWaste: { type: Number, default: 0 },
  water: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  totalCarbon: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.model("User", userSchema,'users');

// create user
const createUser = async (newUserData) => {
  var newuser = new User ({userName: newUserData.body.user,password: newUserData.body.passw})
  newuser.save(function (err, newuser){
    if (err) return console.error(err);
    console.log(newuser.userName + " created successfully!")
  });

  //let result = await User.createUserState(newUserData);
  // console.log(result);
  // return result;
};

//Read user data
const findUserById = async (id) => {
  let user = await User.findById(id);
  return user;
};

//Update exiting user data
const updateUserById = async (id, newUserData) => {
  let updatedUser = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
  });
  return updatedUser;
};

//Delete User data
const deleteUserById = async (id) => {
  let deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

module.exports = { createUser, findUserById, updateUserById, deleteUserById };
