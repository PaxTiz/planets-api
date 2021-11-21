const axios = require('axios')
require('dotenv').config()

const http = axios.create()
http.defaults.baseURL = process.env.BASE_URL

module.exports = http
