import axios from 'axios'

export default ({ store }) => {
  axios.interceptors.request.use(config => {
    console.log(process.env.URL_MAPA)
    if (config.url.indexOf(process.env.URL_MAPA)) {
      config.headers.authorization = 'Basic BASE64=USUARIO:SENHA'
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
