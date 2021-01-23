const express = require('express');
const {
    googleAuthModel,
    facebookAuthModel,
    addAccountDetailsModel,
    getAccountDetailsModel,
    createCampaignModel,
    getCampaignsModel,
    getSingleCampaignsModel,
    getUserCampaignsModel,
    createCampaignsCommentModel,
    createCampaignsSupporterModel,
} = require('../models');






const googleAuthController = (req, res) => {
    googleAuthModel(req.body, result => {
        // console.log(JSON.stringify(result));
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}

const facebookAuthController = (req, res) => {
    facebookAuthModel(req.body, result => {
        //console.log(JSON.stringify(result));
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}


//Add Account Details
const addAccountDetailsController = (req, res) => {
    addAccountDetailsModel(req.body, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}


//Get Account Details

const getAccountDetailsController = (req, res) => {
    getAccountDetailsModel(req.params, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}



//Create a campaign
const createCampaignController = (req, res) => {
    createCampaignModel(req.body, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}

//Get all campaigns
const getCampaignsController = (req, res) => {
    getCampaignsModel(req.params, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}

//Get single campaigns
const getSingleCampaignsController = (req, res) => {
    getSingleCampaignsModel(req.params, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}


//Get User campaigns
const getUserCampaignsController = (req, res) => {
    getUserCampaignsModel(req.params, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}

//Create Campaign Comment 
const createCampaignsCommentController = (req, res) => {
    createCampaignsCommentModel(req.body, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}

//Create Campaign Supporter
const createCampaignsSupporterController = (req, res) => {
    createCampaignsSupporterModel(req.body, result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}



module.exports = {
    googleAuthController,
    facebookAuthController,
    addAccountDetailsController,
    getAccountDetailsController,
    createCampaignController,
    getCampaignsController,
    getSingleCampaignsController,
    getUserCampaignsController,
    createCampaignsCommentController,
    createCampaignsSupporterController,
};
   


