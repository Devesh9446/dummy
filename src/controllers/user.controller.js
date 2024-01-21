import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {user} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser =asyncHandler( async(req,res)=>{
    const {fullname,email,username,password}=req.body

    if([fullname,email,username,password].some((field)=>field?.trim()==="")){
        throw new apiError(400,"Allfields required")
    }

    const existingUser=await user.findOne({
        $or: [{username},{email}]
    })
    if(existingUser)
    {
        throw new apiError(409,"User already exist")
    }
    const coverImagePath=req.files?.coverImage[0].path
    const coverImage=await uploadOnCloudinary(coverImagePath)
    const newUser=await user.create({
        fulname,
        coverImage:coverImage.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser=await user.findById(newUser._id).select(
        "-password -refreshToken" 
    )
    if(!createdUser){
        throw apiError(400,"something went wrong whie registering the user")
    }

    return res.status(201).json(
        new apiResponse(200,createdUser,"User created Successfully")
    )
})

export {registerUser}