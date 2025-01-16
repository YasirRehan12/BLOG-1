// const bcrypt = require('bcrypt');

import bcrypt from "bcryptjs"
import User from "../model/user.js"


export const signupUser = async (request, response) => {
    try {


        const { username, name, password}=request.body
        // const user = request.body
        const salt=await bcrypt.genSalt(10)
        const hashpassword =  bcrypt.hashSync(password,salt)
        const user = { username,name,password:hashpassword }
        console.log("User : "  , user);
        

        const newUser = new User(user)
        await newUser.save()
        console.log("user",newUser);
        

        return response.status(200).json({ msg: "signup successfull" })

    } catch (error) {

        return response.status(500).json({ msg: "Error while signup the user" })

    }

}


