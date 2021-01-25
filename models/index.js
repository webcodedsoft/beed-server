const { auctionSchema } = require('../schemas');
const { messageHandler } = require('../handlers')


//Create Auction Model
module.exports.createAuctionModel = (data,  responsecallback) => {
    const { title, startDate, endDate, image } = data;
    const newAuctionSchema = new auctionSchema({ title, startDate, endDate, image });
    newAuctionSchema.save((error, success) => {
        if (error) {
            return responsecallback(messageHandler("Something went wrong...", false, error))
        } else {
            return responsecallback(messageHandler("Auction successfuly created", true, {}))
        }
    })
};


//Get Account Details
module.exports.getAuctionModel = (responsecallback) => {
    auctionSchema.find().then((data) => {
        if (data) {
            return responsecallback(messageHandler("Auctions Successfuly Fetch", true, data))
        } else {
            return responsecallback(messageHandler("Error in getting auctions", true, {}))
        }
    }).catch((error) => {
        return responsecallback(messageHandler("Something went wrong...", false, error))
    })
}; 
