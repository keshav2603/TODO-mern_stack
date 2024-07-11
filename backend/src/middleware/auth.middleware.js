import { ApiError } from "../utils/ApiError";
import { AsyncHandler } from "../utils/AsyncHandler";
import  jwt  from "jsonwebtoken";
import { User } from "../models/user.model";

export const verifyJWT = AsyncHandler(async(req, res, next)=>{
    try {
        const token =req.cookie?.accessToken ||req.header("Authorization")?.replace("Bearer", "");
        if(!token){
            throw new ApiError(401, "unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-passowrd -refreshToken");

        if(!user){
            throw new ApiError(401, "invalid accesstoken!!");
        }
        req.user= user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid assesstoken!!");
    }
})