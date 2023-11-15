const { sign, verify } = require('jsonwebtoken')

const authenticateRequest = async (request, response, next) => {
    const token = request.headers.authorization;

    const isTokenExists = !!token;
    if (!isTokenExists) {
        return response.status(400).json({ isSuccess: false, message: 'Session expired. Please login again.' })
    }

    try {
        const decodeToken = await verify(token, 'testKey')

        const isValidToken = !!decodeToken && Object.keys(decodeToken).length > 0;
        if (!isValidToken) {
            return response.status(400).json({ isSuccess: false, message: 'Session expired. Please login again.' })
        }

        next()

    } catch (error) {
        console.error('Error occurs in token authentication:', error.message)
        return response.status(400).json({ isSuccess: false, message: 'Session expired. Please login again.' })
    }
}




const createToken = () => {
    const token = sign({ test: 123 }, 'testKey', { expiresIn: '2d' })
    return token
}

// createToken() // ?

// testToken

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoxMjMsImlhdCI6MTcwMDAzOTI1MiwiZXhwIjoxNzAwMjEyMDUyfQ.R-MuzpsXkTWSdp1e76uAyOKla655gnRF_RJ7N2MExTc

module.exports = {
    createToken,
    authenticateRequest
}