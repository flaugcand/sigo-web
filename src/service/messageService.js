import { Notify } from 'quasar'

export default {
  sucesso (texto) {
    this._createMessage('positive', texto)
  },
  informacao (texto) {
    this._createMessage('info', texto)
  },
  alerta (texto) {
    this._createMessage('warning', texto)
  },
  erro (texto) {
    this._createMessage('negative', texto)
  },
  _createMessage (tipo, texto) {
    Notify.create({
      type: tipo,
      message: texto,
      position: 'bottom',
      timeout: 3000
    })
  }
}
