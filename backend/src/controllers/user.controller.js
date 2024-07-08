import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const registerUser = AsyncHandler( async(req,res)=>{
    // steps to register user
    // 1. take data from frontend
    // 2. checking where the data is not empty
    // 3. check if user exists or not
    // 4. create user obj andentry in database 
    // 5. check entry in database
    const {username, email, password} = req.body

    if(
        [username, email, password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400, "all fields are required");
    }
    const existedUser = await User.findOne({
        $or:[{email}]
    })

    if(existedUser){
        throw new ApiError(409, "user with email already existed!!")
    }

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password
    })
    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )  
    if(!createdUser){
        throw new ApiError(500, "something went wrong while regestering a user");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});