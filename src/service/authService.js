import axios from 'axios'

export default {

    authentication (ojb) {
        return new Promise((resolve, reject) =>{
            axios.post(`${process.env.API}/v1/autenticacao/gettoken`, ojb)
                .then(response => resolve(response))
                .catch(error => reject(error))
        }) 
    },

    check () {
        return this.token() !== null;
    },

    token () {
        return sessionStorage.getItem('token')
    }
}