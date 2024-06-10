import { catchAsyncError } from '../middlewaers/catchAsyncError.js'
import errorHandler from '../middlewaers/error.js';
import { User } from '../models/userSchema.js';
import { sendToken } from "../utils/jwtToken.js"

export const Register = catchAsyncError(async (req, res, next) => {

    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new errorHandler("please fill full registarion form"));
    }

    const isEmail = await User.findOne({ email });

    if (isEmail) {
        return next(new errorHandler("email alredy Exists"));

    }

    const user = await User.create({
        name, email, phone, role, password

    });

    sendToken(user, 200, res, "User Registered SuccessFully")


});




export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new errorHandler("Please Provide email, password, and role", 400))
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new errorHandler("Invalid Email Or Password ", 400));
    }
    const isPassMatched = await user.comparePassword(password);

    if (!isPassMatched) {
        return next (new errorHandler("Invalid Email or Password", 400));
    }

    if (user.role !== role) {
        return next(new errorHandler("User with this Role not Found", 400));
    }

    sendToken(user, 200, res, "Login Successfully");


});

export const logout = catchAsyncError(async(req , res , next)=>{
    res.status(200
        
    ).cookie("token", "" , {
        httpOnly:true,
        expiresIn: new Date(Date.now())
    }).json({
        success: true,
        message: " User Logged Out!"
    });

});  

export const getUser = catchAsyncError(async(req,res,next)=>{
    const  user = req.user;
    res.status(200).json({
        success : true ,
        user,
    })
})
