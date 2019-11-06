import axios from 'axios'

export default axios.create({
  baseURL: process.env.COLOMBO_BACKEND_URL
})
