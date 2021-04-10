import axios from 'axios'

export default {

  consultar (object) {
    return new Promise((resolve, reject) => {
      const URL = `${process.env.API}/v1/empresa`
      axios.get(URL, { 
        params: {
          nomeFantasia: object.nomeFantasia,
          cnpj: object.cnpj,
          razaoSocial: object.razaoSocial,
          inscricaoEstadual: object.inscricaoEstadual
        } 
      }).then(response => resolve(response.data))
      .catch(error => reject(error))
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
  },
  excluir (id) {
    return new Promise((resolve, reject) => {
      const URL = `${process.env.API}/v1/empresa/${id}`
      axios.delete(URL).then(response => resolve(response)).catch(error => reject(error))
    })
  }
}
