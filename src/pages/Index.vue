<template>
  <q-page class="flex flex-center">
      <principal />
  </q-page>
</template>

<script>
import Principal from "src/components/menu/principal.vue"
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PageIndex',
  components: {
    Principal
  },

  computed: {
    ...mapState({
      mostraConsulta: state => state.app.mostraConsulta,
      currentMenu: state => state.app.currentMenu
    })
  },

  watch: {
    splitterModelLocal (value) {
      this.splitterModelLocal = this.splitterModel
    }
  },

  methods: {
    ...mapActions({
      setCurrentMenu: 'app/setCurrentMenu',
      setCurrentView: 'app/setCurrentView',
      setMostraConsulta: 'app/setMostraConsulta'
    }),
    changeCurrentViewConsulta () {
      this.setMostraConsulta(true)
      switch (this.currentMenu) {
        case 'MenuEmpresa':
          this.setCurrentView('ConsultaEmpresa')
          break
      }
    },
    changeCurrentViewFormulario () {
      this.setMostraConsulta(false)
      switch (this.currentMenu) {
        case 'MenuEmpresa':
          this.setCurrentView('FormularioEmpresa')
          break
      }
    }
  },
  mounted () {
    this.setCurrentMenu('')
  }
}
</script>
