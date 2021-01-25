const { createAuctionModel, getAuctionModel } = require('../models');
const path = require('path')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage }).single('image')

//Create Auction
const CreateAuctionController = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ err });
        } else {
            const data = { ...req.body, image: req.file.filename }
            return createAuctionModel(data, (result) => {
                if (result.status) {
                    return res.json({ result });
                } else {
                    return res.status(200).json({ result });
                }
            });
        }
    })
}

//Get Auctions
const getAuctionController = (req, res) => {
    return getAuctionModel(result => {
        if (result.status) {
            return res.json({ result });
        } else {
            return res.status(400).json({ result });
        }
    });
}



module.exports = {
    CreateAuctionController,
    getAuctionController
};
   


