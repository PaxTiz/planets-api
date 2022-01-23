import { create } from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const http = create()
http.defaults.baseURL = process.env.BASE_URL

export default http
