import axios from 'axios'

export default ({ store }) => {
  axios.interceptors.request.use(config => {
    const index = config.url.indexOf(process.env.API)
    if (index !== undefined && index > -1) {
      config.headers.authorization = ''
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(response => {
    return response
  }, error => {
    return Promise.reject(error)
  })
}
