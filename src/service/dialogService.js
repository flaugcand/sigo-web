import { Dialog } from 'quasar'

export default {
    confirm(title, text, ok, cancel) {
        Dialog.create({
            title: title,
            message: text,
            cancel: true,
            persistent: true
        }).onOk(() => {
            ok()
        }).onCancel(() => {
            cancel()
        })
    }
}