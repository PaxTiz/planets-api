const http = require('./http')

const login = async () => {
    const response = await http.post('/auth/login', {
        username: 'Test User',
        password: 'testuser123',
    })
    return response.data.token
}

module.exports = login
