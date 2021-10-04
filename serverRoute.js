const emailHandler = require('./emailHandler')

const Route = async (url, data) => {
    // Route incoming requests
    switch (url) {
        case '/':
            return { statusCode: 200, message: 'Blue Beard Says Hello!'}
        case '/email':
            return await emailHandler.emailHandler(data)
        default:
            return { statusCode: 400, message: 'Url not found'}
    }
}

module.exports = { Route }
