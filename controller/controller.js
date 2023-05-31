import { createJwt, verifyTocken } from "../middleware/jwtMiddle.js";
import { sendOtpMessage, verifyOtp } from "../middleware/mail.js";
import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export function isAuthenticated(req, res){
    res.status(200).json({isAuthenticated:true})
}


export async function login(req, res){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            res.status(200).json({isSigned:false})
        }else{
            bcrypt.compare(password, user.password, async function (err, result){
                if(result){
                    const token = await createJwt({id:user._id});
                    if(token){
                        res.status(200).json({token:token, isSigned:true})
                    }else{
                        res.status(401).json({invalid:true})
                    }
                }else{
                    
                    res.status(401).json({invalid:true})
                }
            })
        }
    }catch(err){
        console.log(err);
        res.status(401).json({invalid:true})
    }
}

 export async function signup(req, res){
    try {
        const {email, name, password, otp} = req.body;
            const user = await User.findOne({email:email})
            if(user){
                res.status(200).json({already:true})
            }else{
                const otpVerify =  verifyOtp(otp);
            if(otpVerify == true){
                const  salts = 7
                bcrypt.genSalt(salts,function(err,data){
                    bcrypt.hash(password,data,function(err,hash){
                        new User({
                            email:email,
                            password:hash,
                            name:name
                        }).save().then(async(result)=>{
                            const token = await createJwt({
                                id : result._id
                            })
                            if(token){
                                res.status(200).json({signed:true, token:token})
                            }else{
                                res.status(500).json({signed:false, token:false})
                            } 
                        })
                    })
                })
            }
        }
        } catch (error) {
            res.status(401).json({invalid:true})
        }
 }

 export async function otpMail(req, res){
    try {
        const {email} = req.body;
         let messsage = await sendOtpMessage(email);
         if(messsage){
            res.status(200).json({messaged:true})
         }else{
            res.status(500).json({messaged:false})
        }
    } catch (error) {
        res.status(500).json({messaged:false})
    }
 }

 export async function about(req, res){
        try {
            let user = await User.findById(res.locals.userId.id,{name:1, email:1});
            res.status(200).json({user:user})
        } catch (error) {
            res.status(500).json({user:false});
        }
 }

 export async function upload(req, res){
    console.log(req.body);
 }