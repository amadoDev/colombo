import axios from 'axios'

export default axios.create({
  baseURL: process.env.OPTIMIZA_URL
})
