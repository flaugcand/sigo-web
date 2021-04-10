import axios from 'axios'
import authService from 'src/service/authService'

export default ({ store }) => {
  axios.interceptors.request.use(config => {
    const index = config.url.indexOf(process.env.API)
    if (index !== undefined && index > -1 && authService.check()) {
      config.headers.authorization = authService.token()
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
