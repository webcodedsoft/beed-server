const mongoose = require('mongoose');
const Schema = mongoose.Schema


const auctions = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
        trim: true
    },
    endDate: {
        type: Date,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
const auctionSchema = mongoose.model('auctions', auctions);


module.exports = { auctionSchema }