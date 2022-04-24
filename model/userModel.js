const mongoose = require("./mongoose");
const debug=require("debug")("server:userModel")

const recordSchema=new mongoose.Schema({
  date:{type: String, default: (new Date()).toLocaleString()},
  electricity: { type: Number, default: 0 },
  naturalGas: { type: Number, default: 0 },
  carMiles: { type: Number, default: 0 },
  plasticWaste: { type: Number, default: 0 },
  water: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  totalCarbon: { type: Number, default: 0 },
})

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  records:[recordSchema],
  createdAt:{type: Date, default: new Date()},
  updatedAt: {type: Date, default: new Date()}
});

const User = mongoose.model("User", userSchema);
// create user
const createUser = async (newUserData) => {
  const newuser = await User.create (newUserData)
  return newuser;
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

//-
const findByName=async (userName)=>{
  try {
    let docFoundByName=await User.findOne(userName)
    return docFoundByName;
  } catch(error) {
    debug("Cannot find the username in database"); 
    }
  }

const addRecordByName=async (userName, record)=>{
  try{
    const userFound=await User.findOne({userName:userName});
    userFound.records.push(record);
    userFound.save();
    debug("userFound", userFound);
    return userFound;
  } catch (error){
    debug("Error at addRecordByName")
  }
}

module.exports = { createUser, findUserById, updateUserById, deleteUserById, findByName, addRecordByName };
