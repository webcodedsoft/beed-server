const express = require('express');
const { googleAuthController, facebookAuthController, addAccountDetailsController,
    getAccountDetailsController, createCampaignController, getCampaignsController,
    getSingleCampaignsController, getUserCampaignsController,
    createCampaignsCommentController, createCampaignsSupporterController,
} = require('../controllers');


const router = express.Router();


// router.get("/", authController);

router.post("/google-auth", googleAuthController);
router.post("/facebook-auth", facebookAuthController);
router.post("/add-bank-detail", addAccountDetailsController);
router.get("/get-account-detail/:_id", getAccountDetailsController);
router.post("/create-campaign", createCampaignController);
router.get("/get-campaigns/:pageNum?/:nPerPage?", getCampaignsController);
router.get("/get-single-campaign/:campaign_id", getSingleCampaignsController);
router.get("/get-user-campaign/:_id?/:pageNum?/:nPerPage?", getUserCampaignsController);
router.put("/create-campaign-comment", createCampaignsCommentController);
router.put("/create-campaign-supporter", createCampaignsSupporterController);



module.exports = router;