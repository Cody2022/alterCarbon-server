const {findUserById, createUser} = require('./userModel.js');
const {test} = require('./testMongoose');

const userInfo = {
    userName : "",
    electricity : 0,
    naturalGas : 0,
    carMiles : 0,
    plasticWaste : 0
}


const welcomePage = () => {
    return `<p>Welcome to the page, please enter your name: </p>
    <input id="name" />
    <a id="link"><button onClick="test()">Go</button></a>`
}
  
  
// const loadUserState = async (id) => {
//   let loadedUserState = await findGameById(id);
//   userInfo = loadedUserState;
//   let returnMessage = `Page has been loaded, welcome ${userInfo.name}
//   to continue please choose door 1 or door 2,
//   curl http://localhost:5000/api/userInfo`;
//   return returnMessage;
// };

// const createUserState = async (userName) => {
//   let newUserState = await createUser({ userName : "", electricity : 0,
//   naturalGas : 0,
//   carMiles : 0,
//   plasticWaste : 0  });
//   let newUserId = newUserState._id;
//   let Name = await findUserById(newUserId);
//   userState = userName;
//   let message = `<p>Hello ${Name} ${userInfo.userName}`;
//   return message;
// };

//module.exports = {welcomePage,loadUserState, createUserState}
module.exports = {welcomePage}