import express from "express";
import {
    isAuthenticated,
    login,
    signup,
    otpMail,
    about,
    upload
} from '../controller/controller.js'

import {chechAuth} from '../middleware/auth.js'
import { uploadFile } from "../middleware/multer.js";
const router = express.Router();


router.route('/isAuthenticated')
    .get(chechAuth,isAuthenticated)
router.route('/login')
    .post(login)
router.route('/signup')
    .post(signup);
router.route('/otpMail')
    .post(otpMail)
router.route('/about')
    .get(chechAuth, about)
router.route('/upload')
    .post(chechAuth,upload); 


export default router