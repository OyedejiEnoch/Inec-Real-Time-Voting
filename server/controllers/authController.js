import Voter from "../models/voterModel.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/sendEmail.js";
import { createError } from "../utils/errorHandler.js";

// to create/register a new voter
export const registerVoter = async (req, res, next)=>{
    const {fullName, lastName, email, password} =req.body
    try {
        const newVoter = new Voter (req.body);
        const voter = await newVoter.save()

        // we can attach a user token
        const token = jwt.sign({id:voter._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_TIME
        })  

        const {password, ...userDetails} = voter._doc;

        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
        }).status(201).json({
            success:true,
            userDetails,
            token
        })

    } catch (error) {
        next(error)
    }
}

// to login a user
export const loginVoter = async(req, res, next)=>{

    try {
        if(!req.body.email | !req.body.password | !req.body.voterId){
            // if no email or password or voterId is provided we throw an error
           return next(createError(404, "Email, password and voterId are required"))
        }
        // if no email or password is provided we throw an error

        // we find the user
        const user =await Voter.findOne({ email:req.body.email })
        if(!user){
           return  next(createError(404, "User not found, please register"))
        }

        // once we've found the user, we want to compare or check password
        const isPasswordValid = await user.comparePassword(req.body.password)

        if(!isPasswordValid){
            return next(createError(404, "Invalid email or password"))
        }

        // we also want to compare the voterId
        const isVoterIdValid = await user.compareVoterId(req.body.voterId)

        if(!isVoterIdValid){
            return next(createError(404, "Invalid voter ID"))
        }

        // if password is true, we login the user, adding the token and cookies to it
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_TIME
        })

        const { password, ...userDetails } = user._doc;

        res.cookie("accessToken", token, {
            httpOnly:true,
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
        }).status(200).json({
            success:true,
            message: "Login successful",
            userDetails
        })
    } catch (error) {
        next(createError(400, "Error logging in voter"))
    }
}
