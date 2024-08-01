import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import  jwt  from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = AsyncHandler(async(req, res, next)=>{
    try {
        let token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
        if(!token){
            throw new ApiError(401, "unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, "invalid accesstoken!!");
        }
        req.user= user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid assesstoken!!");
    }
})