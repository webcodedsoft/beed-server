const jwt = require('jsonwebtoken')

const messageHandler = (message, status, data) => {
    return response = { message, status, data };
}

const tokenHandler = (data, user) => {
    var token = jwt.sign({ _id: user._id }, '16036371358', { expiresIn: '7d' });
    var { name, email, imageUrl } = data;
    const response = { _id: user._id, date: user.date, name, email, token, imageUrl, accountdetails: user.accountdetails };
    return response ;
}



module.exports = { messageHandler, tokenHandler }