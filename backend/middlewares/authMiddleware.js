import User from '../models/userModel.js'
import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler.js"

//
const authenticate = asyncHandler(async (req, res, next) => {
    console.log('authenticate function called');
    let token;

    //Read jwt from 'jwt' cookies
    token = req.cookies.jwt

    if(token) {
        // console.log('Received token:', token);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");

            if(!req.user) {
                res.status(404)
                throw new Error("Not authorized, user not found");
            }
            next();
        } catch(error) {
            res.status(401)
            throw new Error ("Not authorized, token failed");
        }
    } else {
        res.status(401)
        throw new Error("Not authorized, no token");
    }
})

//check for admin
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("Not authorized as an admin.")
    }
}

export { authenticate, authorizeAdmin };