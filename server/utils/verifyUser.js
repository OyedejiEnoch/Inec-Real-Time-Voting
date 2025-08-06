import jwt from 'jsonwebtoken';
import { createError } from './errorHandler.js';
import Voter from "../models/voterModel.js"


export const verifyUser = (req, res, next)=>{
    const token = req.cookies.accessToken;
    if(!token){
        return next(createError(401, "You are not authenticated!"));
    }
    // after checking for the token, we then verify it using jwt and also get the details of the user
    jwt.verify(token, process.env.JWT_SECRET, async (err, user)=>{
        if(err){
            return next(createError(403, "Token is not valid!"));
        }

        req.user = await Voter.findById(user.id); // attach the user details to the request object
        next(); // call the next middleware or route handler
    });

}