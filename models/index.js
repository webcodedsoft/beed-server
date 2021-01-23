const { authSchema, campaignSchema } = require('../schemas');
const { messageHandler, tokenHandler } = require('../handlers')
const { OAuth2Client } = require('google-auth-library')
const _ = require('lodash');
const { response } = require('express');
const { toNumber } = require('lodash');

let googleId = '505035190650-j2o52c3p0fq18enl0b3ac9teck7g9s5c.apps.googleusercontent.com';
const googleClient = new OAuth2Client(googleId);
const mongoose = require('mongoose');



module.exports.googleAuthModel = (data, responsecallback) => {
    const { imageUrl, email, name, tokenId, accessToken, googleId } = data;

    
    googleClient.verifyIdToken({ idToken: tokenId }).then(res => {
        
        authSchema.findOne({ email }).exec((err, user) => {
            
            if (err) {
                return responsecallback(messageHandler("Something went wrong...", true, {}))
            } else {
                if (user) {

                    const userData = tokenHandler(data, user)
                    return responsecallback(messageHandler("Login Successfuly", true, userData))

                } else {
                   
                    const savedData = { image: imageUrl, email, name, password: googleId };
                    const newauthSchema = new authSchema(savedData);
                    newauthSchema.save((error, user) => {
                        if (error) {
                            return responsecallback(messageHandler("Something went wrong...", false, error))
                        } else {
                            const userData = tokenHandler(data, user)
                            return responsecallback(messageHandler("Registration Successfuly", true, userData))
                        }
                    })

                }
                
            }

        })
    })
    

}; 

module.exports.facebookAuthModel = (datas, responsecallback) => {
    const { email, name, accessToken, picture } = datas;
    var imageUrl = picture.data.url
    
    const data = { email, name, imageUrl, token: accessToken };


    // console.log(data)

    authSchema.findOne({ email }).exec((err, user) => {
        if (err) {
            return responsecallback(messageHandler("Something went wrong...", true, {}))
        } else {
            
            if (user) {

                const userData = tokenHandler(data, user)
                return responsecallback(messageHandler("Login Successfuly", true, userData))

            } else {

                const savedData = { image: imageUrl, email, name, password: googleId };
                const newauthSchema = new authSchema(savedData);
                newauthSchema.save((error, user) => {
                    if (error) {
                        return responsecallback(messageHandler("Something went wrong...", false, error))
                    } else {
                        const userData = tokenHandler(data, user)
                        return responsecallback(messageHandler("Registration Successfuly", true, userData))
                    }
                })

            }
            
        }

    }) 
    

}; 


//Add Account Details
module.exports.addAccountDetailsModel = (data, responsecallback) => {
    const { _id, accountName, accountNumber, bankName } = data;
    authSchema.updateOne(
        { _id: _id },
        { $set: { accountdetails: { accountName, accountNumber, bankName } } },
        (error, success) => {
            if (error) {
                return responsecallback(messageHandler("Something went wrong...", false, error))
            } else {
                return responsecallback(messageHandler("Bank details successfuly added", true, {}))
            }
    });
};



//Get Account Details
module.exports.getAccountDetailsModel = (data, responsecallback) => {
    const { _id } = data

    authSchema.findOne({ _id }).then((data) => {
        if (data) {
            return responsecallback(messageHandler("Account Details Successfuly Fetch", true, data))
        } else {
            return responsecallback(messageHandler("Error account details", true, {}))
        }

    }).catch((error) => {
        return responsecallback(messageHandler("Something went wrong...", false, error))
    })
}; 




//Create a campaign
module.exports.createCampaignModel = (data, responsecallback) => {

    const newCampaignSchema = new campaignSchema(data);
    newCampaignSchema.save((error) => {
        if (error) {
            return responsecallback(messageHandler("Something went wrong...", false, error))
        } else {
            return responsecallback(messageHandler("Data Successfuly Saved", true, {})) 
        }
    })
};


//Get all campaigns
module.exports.getCampaignsModel = (data, responsecallback) => {
    const { pageNum, nPerPage } = data
    var campaignAll = []
    var userAll = []
        

    campaignSchema.aggregate([
        {
            $lookup:
            {
                from: "auths", 
                localField: "by_who",
                foreignField: "_id",
                as: "user"
            }
        }
    ])
        .sort({ createdAt: -1 })
        .skip(pageNum > 0 ? ((pageNum - 1) * nPerPage) : 0)
        .limit(toNumber(nPerPage))
        .then((data) => {
            // console.log(data)
            return responsecallback(messageHandler("Data Successfuly Fetch", true, data))
    }).catch((error) => {
        // console.log(error)
        return responsecallback(messageHandler("Something went wrong...", false, error))
    })
    

}; 


//Get single campaigns
module.exports.getSingleCampaignsModel = (data, responsecallback) => {
    const { campaign_id } = data
    
    campaignSchema.findOne({ _id: campaign_id }).then((data) => {
        if (data) {
            return responsecallback(messageHandler("Single Data Successfuly Fetch", true, data)) 
        } else {
            return responsecallback(messageHandler("Error retrieving campaign", true, {})) 
        }
        
    }).catch((error) => {
        return responsecallback(messageHandler("Something went wrong...", false, error))
    })
}; 


//Get User campaigns
module.exports.getUserCampaignsModel = async (data, responsecallback) => {
    const { _id, pageNum, nPerPage } = data

    var documentCount = await campaignSchema.find({ by_who: _id }).countDocuments().then(count => { return count })
    
    campaignSchema.find({ by_who: _id }).sort({ createdAt: -1 })
    .skip(pageNum > 0 ? ((pageNum - 1) * nPerPage) : 0)
    .limit(toNumber(nPerPage))
    .then( (data) => {
        if (data) {
            return responsecallback(messageHandler("User Data Successfuly Fetch", true, {data, affectedRow: documentCount})) 
        } else {
            return responsecallback(messageHandler("Error retrieving campaign", true, {})) 
        }
        
    }).catch((error) => {
        return responsecallback(messageHandler("Something went wrong...", false, error))
    })
   
}; 


//Create Comment campaign
module.exports.createCampaignsCommentModel = (data, responsecallback) => {
    const { _id, comments, by_who } = data;
    campaignSchema.updateOne(
        { _id: _id },
        { $push: { comments: { content: comments, by_who, createdAt: new Date()} } },
        (error, success) => {
        if (error) {
            return responsecallback(messageHandler("Something went wrong...", false, error))
        } else {
            return responsecallback(messageHandler("Comment Successfuly Saved", true, {}))
        }
    });
};


//Create Supporters campaign
module.exports.createCampaignsSupporterModel = (data, responsecallback) => {
    const { _id, show_identity, amount, by_who, name } = data;
    campaignSchema.updateOne(
        { _id: _id },
        { $push: { supporters: { show_identity, amount, by_who, name, createdAt: new Date() } }, $inc: { pledged: amount } },
        (error, success) => {
        if (error) {
            return responsecallback(messageHandler("Something went wrong...", false, error))
        } else {

            if (by_who !== "No ID") {
                authSchema.updateOne(
                    { _id: by_who },
                    { $push: { backedCampaigns: { _id, amount, name, createdAt: new Date() } } },
                    (error, success) => {
                    if (error) {
                        return responsecallback(messageHandler("Something went wrong...", false, error))
                    } else {
                        return responsecallback(messageHandler("Thanks for your support, we really appreciate it. God bless you", true, {}))
                    }
                });
            } else {
                return responsecallback(messageHandler("Thanks for your support, we really appreciate it. God bless you", true, {}))
            }
            
        }
    });
};


