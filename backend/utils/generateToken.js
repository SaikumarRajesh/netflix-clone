import jwt from 'jsonwebtoken'; 

import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie =(userId, res) =>{
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"});

    res.cookie("jwt-netflix", token, {
        maxage: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prvent XSS attcaks cross=site scripting attacks, make it not ne accesside by JS
        sameSite:"strict", // CSRF attacks cross-site request forgery attacks
        secure: ENV_VARS.NODE_ENV !== "development" //cookie will only be set in https in production
    })


    return token
}