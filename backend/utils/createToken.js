// 26:12 mins 

import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({userId: userId._id}, process.env.JWT_SECRET, {expiresIn: "30d"});

        //set jet as HTTP-only Cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development' ,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
    
        return token;
    } catch (error) {
        console.error('Error generating token: ', error);
        throw new Error ('Failed to generate jrk token')
    }
};

export default generateToken;

// {userId: userId.username}