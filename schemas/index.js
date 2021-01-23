const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ObjectId = Schema.ObjectId


//Auth Model
const auth = new Schema({
    email: {
        type: String,
        trim: true,
        // unique: true,
        lowercase: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    accountdetails: {
        type: Array,
    },
    backedCampaigns: {
        type: Array,
    },
    date: {
        type: String,
        default: new Date()
    }
})

const authSchema = mongoose.model('auths', auth);


const campaign = new Schema({
    by_who: {
        type: ObjectId,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        trim: true
    },
    goal: {
        type: Number,
        required: true,
        trim: true
    },
    pledged: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    comments: {
        type: Array,
    },
    supporters: {
        type: Array,
    },
    createdAt: {
        type: String,
        default: new Date()
    }
})
const campaignSchema = mongoose.model('campaigns', campaign);



module.exports = { authSchema, campaignSchema }