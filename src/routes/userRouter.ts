import express from "express";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import userModel from "../models/User";
import userController from '../controllers/userController';
import { config } from '../config/config';
const { isLoggedIn } = require('../middleware/authMiddleware');

//import {protect} from '../middleware/authMiddleware';

const router = express.Router();

/* SET STORAGE MULTER */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var fileExtension = file.originalname.split('.');
        cb(null, `${file.fieldname}-${Date.now()}.${fileExtension[fileExtension.length - 1]}`);
    }
})
const upload = multer({ storage: storage })

const imgURL = 'http://192.168.1.79/uploads/'

/* user routes */
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.put('/updateProfile', userController.updateProfile);
router.post('/forgotPassword', isLoggedIn, userController.forgotPassword);
router.put('/updatePassword', isLoggedIn, userController.updateUserPassword);
router.get('/userList', isLoggedIn, userController.getUserList);
router.post('/logout', isLoggedIn, userController.logout);
router.post('/removeProfilePicture', isLoggedIn, userController.removeProfilePicture);

/* idea routes */
router.post('/postIdea', isLoggedIn, userController.postIdea);
router.get('/ideaList', userController.getIdeaList);
router.post('/viewsIdea', isLoggedIn, userController.viewsIdea);
router.post('/updateStatus', isLoggedIn, userController.updateIdeaStatus);
router.post('/getIdeaByUserId', isLoggedIn, userController.getIdeaByUserId);
router.post('/ideaDetailById', isLoggedIn, userController.ideaDetailByIdeaId);
//router.post('/searchTargetAudience', protect, userController.searchWithTargetAudience);

/* validate idea routes */
router.get('/searchTargetAudience/:key', isLoggedIn, userController.searchAudience);
router.post('/validateIdea', isLoggedIn, userController.validateIdea);
router.get('/validatedIdeaList', isLoggedIn, userController.validatedIdeaList);

/* count routes */
router.get('/validatedIdeaCount', isLoggedIn, userController.validateIdeaCount);
router.post('/totalView', isLoggedIn, userController.getViewsIdeaCount);
router.get('/questionCount', isLoggedIn, userController.questionCount);
router.get('/getPointCount', isLoggedIn, userController.getThePoint);
/*--------------------------------------------------------------------------------*/

/* dashboard routes */
router.get('/leaderBoard', isLoggedIn, userController.getLeaderBoard);
router.post('/myIdea', isLoggedIn, userController.myIdea);

/* notification routes */
router.get('/getNotification', isLoggedIn, userController.getNotification);
router.put('/updateNotificationStatus', isLoggedIn, userController.updateNotificationStatus);

/* transaction routes */
router.post('/getTransactionHistoryByUser', isLoggedIn, userController.transactionHistoryByUser);
router.post('/rewardPointsByUser', isLoggedIn, userController.getRewardPointByUser);

/* analticsy router */
router.post('/follow', isLoggedIn, userController.follow);
router.post('/following', isLoggedIn, userController.following);
router.get('/followersCount', isLoggedIn, userController.followersCount);
router.get('/followingCount', isLoggedIn, userController.getFollowing);

router.get('/postValidatedCount', userController.postValidatedCount);
router.get('/ideaPosted', userController.ideaPostedCount);

/*------------------------- start uploadProfilePicture functionaliy --------------------------*/

router.post('/uploadProfilePicture', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.userId == undefined || req.body.userId == null || req.body.userId == "") {
        res.status(422).json({ success: false, message: "userId cannot be blank" });
        return;
    }
    let userDetails = await userModel.findOne({ "_id": req.body.userId });
    if (userDetails) {
        if (req.file) {
            const images = req.file;
            const profileImg = await userModel.updateOne({ _id: userDetails._id },
                {
                    $set: {
                        images: config.bucket.aws + images.filename,
                    }
                });
            return res.status(200).json({ success: true, message: "Profile uploaded Successfully" })
        }
        else {
            return res.status(400).json({ success: false, message: "profile image is require" });
        }
    }
    else {
        return res.status(400).json({ success: false, message: "User not found" });
    }
})
/*------------------------- end uploadProfilePicture functionaliy --------------------------*/



export = router;