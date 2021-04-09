import axios from 'axios'

export default {

  consultar (object) {
    return new Promise((resolve, reject) => {
      const URL = `${process.env.API}/v1/empresa`
      axios.get(URL).then(response => resolve(response.data)).catch(error => reject(error))
    })
  },
  salvar (object) {
    return new Promise((resolve, reject) => {
      const URL = `${process.env.API}/v1/empresa`
      axios.post(URL, object).then(response => resolve(response.data)).catch(error => reject(error))
    })
  },
  atualizar (object) {
    return new Promise((resolve, reject) => {
      const URL = `${process.env.API}/v1/empresa/${object.id}`
      axios.put(URL, object).then(response => resolve(response.data)).catch(error => reject(error))
    })
  }
  

}
