import express from "express";
import {
    isAuthenticated,
    login,
    signup,
    otpMail,
    about,
    upload,
    fetchPost,
    fetchOnePost,
    update,
    deletePost,
    fetch10post,
    fetchCurr
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
    .post(chechAuth,uploadFile.single("file"),upload);
router.route('/fetchPost')
    .get(chechAuth,fetchPost)
router.route('/fetchOnePost')
    .get(chechAuth,fetchOnePost)
router.route('/update')
    .patch(chechAuth,uploadFile.single("file"),update)
router.route('/deletePost')
    .delete(chechAuth,deletePost)
router.route('/fetch10post')
    .get(fetch10post)
router.route('/fetchCurr')
    .get(chechAuth, fetchCurr)


export default router