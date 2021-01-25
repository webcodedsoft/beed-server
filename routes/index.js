const express = require('express');
const { CreateAuctionController, getAuctionController } = require('../controllers');
const router = express.Router();


router.post("/create-auction", CreateAuctionController);
router.get("/get-auction", getAuctionController);



module.exports = router;