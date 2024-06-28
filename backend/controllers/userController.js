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
        throw new Error ('Please fill all the input');
        return;
    };

    //validate if the user already exits
    const userExits = await User.findOne({ email })
    if(userExits) {
        res.status(400).send('User already exists.');
        return;
    };

    // hash password by first salting
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creste an instance of the User object
    const existingUser = new User({username, email, password: hashedPassword})


    //Save the user object in a try...catch block
    try {
        await existingUser.save();
        generateToken(res, existingUser._id);

        res.status(200).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        });
    } catch(error) {
        res.status(400);
        throw new Error ('invalid user detail')
    }

});

//loginUser function
const loginUser = asyncHandler(async (req, res) => {
    console.log('loginUser function called');
    //extract existing user info from req.body
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);

    //validate exting user email
    const existingUser = await User.findOne({ email });

    //if email exist, compare password
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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({message: "logged out successfully"})
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

export { createUser, loginUser, logoutUser, getAllUsers };