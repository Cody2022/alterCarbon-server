const { createUser, findUserById, updateUserById, deleteUserById } = require("./userModel");


async function test(){
    //  let createdUser = await createUser({userName : "ABC",electricity : 0,naturalGas :0,carMiles :0,plasticWaste :0})
    //  console.log(createdUser)

    let findId = await findUserById("62588cd8d4d34ef40dfbb8d0")
    console.log(findId)

    // let updateUser = await updateUserById ("62588cd8d4d34ef40dfbb8d0",{userName:'Hari'})

    // let deletedUser = await deleteUserById ("625784e997756eb29f836a25")
    // console.log(deletedUser)


}


test()