import jwt from 'jsonwebtoken';
import config from '../configs/const';
import User from '../models/user';


function authenToken(req, res, next) {
    const token = req.header('token') || req.body.token;

    if(token) {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to authentication"
                });
            }

            User.findOne({ where: { email: decoded.email }}).then((user) => {
                if(user) {
                    res.locals.user = user;
                    return next();
                }

                return res.status(200).json({
                    success: false,
                    message: "Invalid token"
                });
            });
        })
    } else {
        return res.status(200).json({
                    success: false,
                    message: "Failed to authentication, token not found"
                });
    }
}

export default { authenToken }