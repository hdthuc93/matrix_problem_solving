import User from '../models/user';
import dateUtils from '../utilities/date_times';
import jwt from 'jsonwebtoken';
import config from '../configs/const';
import bcrypt from 'bcrypt';

function register(req, res) {
    let inObj = {
        date_of_birth: dateUtils.changeToYYYYMMDD(req.body.date_of_birth) || null,
        mobile_number: req.body.mobile_number,
        email: req.body.email,
        password: req.body.password,
        real_name: req.body.real_name,
        user_type_id: req.body.user_type_id
    };

    User.create(inObj).then((user) => {
        return res.status(200).json({
            success: true,
            message: "Create user successfully"
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    });
}

function login(req, res) {
    User.findOne({ where: { email: req.body.email }}).then((user) => {
        if(!user) {
            return res.status(200).json({
                success: false,
                message: "Username or password incorrect"
            });
        }

        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to authenticate user"
                });
            } 

            if(isMatch) {
                jwt.sign({ username: user.email, user_type: user.user_type_id }, config.secretKey, 
                        { algorithm: 'HS256', expiresIn: 60 * 60 * 24 * 7 }, (err, token) => {
                    if(err) {
                        return res.status(500).json({
                            success: false,
                            message: "Error, cannot response a token"
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        message: "Login successfully",
                        name: user.real_name,
                        token: token
                    });
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Username or password incorrect"
                });
            }
        })
    });
}

export default { register, login }