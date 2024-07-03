import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import generateToken from '../utils/createToken.js';
import bcrypt from 'bcryptjs'

//createUser function
const createUser = asyncHandler(async (req, res) => {

    //extract user properties from the user via req.body
    const { username, email, password } = req.body;

    //validate if user input is empty
    if(!username || !email || !password) {
        return res.status(400).send('Please fill all the input');
    
    };

    //validate if the user already exits
    const userExits = await User.findOne({ email })
    if(userExits) {
        return res.status(400).send('User already exists.');
    
    };

    // hash password by first salting
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creste an instance of the User object
    const existingUser = new User({username, email, password: hashedPassword})

    //generate token
    try {
        generateToken(res, existingUser._id);
    } catch (error) {
        console.error('Error generating token:', error);
        return res.status(500).json({ message: 'Failed to generate user token' });
    }
    //Save the user object in a try...catch block
    try {
        await existingUser.save();

        res.status(200).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        });
    } catch(error) {
        console.error('Error saving the user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
 
});

//loginUser function
const loginUser = asyncHandler(async (req, res) => {
    console.log('loginUser function called');

    //extract user info from req.body
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);

    //check if user email exists
    const existingUser = await User.findOne({ email });

    //if email exist, check if the password given by the user
    //matches the one already existing
    if(existingUser) {
        const isPasswordValid = await bcrypt.compare(
            password, existingUser.password
        );

        if(isPasswordValid) {
            generateToken(res, existingUser._id)
    
            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
            return;
        }
    };
})

//logoutUser function
const logoutUser = asyncHandler(async(req, res) => {

    //To log out, reset the values of the cookie
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({message: "logged out successfully"})
})

//Get all users method
const getAllUsers = asyncHandler(async (req, res) => {
    //To get aall users, provide an empty object
    const users = await User.find({});
    res.json(users);
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){ 
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export { createUser, loginUser, logoutUser, getAllUsers, getCurrentUserProfile };