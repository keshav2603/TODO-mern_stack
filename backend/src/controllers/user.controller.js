import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken =refreshToken;

        await user.save({validateBeforeSave:false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh token");
    }

}

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
        throw new ApiError(409, "user with email already existed")
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
    const options = {
        httpOnly:true,
        secure:true,
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

const loginUser = AsyncHandler( async(req, res) =>{
    const {email, password} = req.body
    if(!email){
        throw new ApiError(400, "email ir required for login");
    }
    if(!password){
        throw new ApiError(400, "password is required for login")
    }
    const user =await User.findOne({
        $or :[{email}]
    })
    if(!user){
        throw new ApiError(404, "user not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "password is not valid")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly:true,
        secure:true,
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "user logged in successfully"
        )
    )
});

const logoutUser = AsyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options ={
        httpOnly:true,
        secure:true,
    }
    return res.
    status(204).
    clearCookie("accessToken",options).
    clearCookie("refreshToken",options).json(
        new ApiResponse(204, {}, "user logged out successfully")
    )

})
const refreshAccessToken = AsyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid refresh token");
    }
});

const getCurrentUser = AsyncHandler( async(req, res) => {
    return res.status(200)
    .json(new ApiResponse(200, req.user, "current user fetch successfully!"));
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
}