const { createUser } = require("./userModel");


async function test(){
    let createdUser = await createUser({userName : "Sirisha Lakku",electricity : 0,naturalGas :0,carMiles :0,plasticWaste :0})
    console.log(createdUser)

}
test()