<template>
  <keep-alive>
    <component :is="view" ref="view"/>
  </keep-alive>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ConsultaEmpresa from '../empresa/consulta.vue'
import FormularioEmpresa from '../empresa/formulario.vue'

export default {
  name: 'MenuEmpresa',
  provide () {
    return {
      setView: this.setView
    }
  },
  data () {
    return {
      view: 'ConsultaEmpresa'
    }
  },
  mounted () {
    this.setViewEmpresa()
  },
  components: {
    ConsultaEmpresa,
    FormularioEmpresa
  },
  computed: {
    ...mapState({
      currentView: state => state.app.currentView
    })
  }, methods: {
    ...mapActions({
      setCurrentView: 'app/setCurrentView'
    }),
    setView (view) {
      this.view = view
      return new Promise(resolve => {
        this.$nextTick(() => {
          resolve(this.$refs.view)
        })
      })
    },
    setViewEmpresa () {
      if (this.currentView === 'FormularioEmpresa') {
        this.setView('FormularioEmpresa').then(view => {
          if (this.objetoRetornoServicoAutocomplete.obj && this.objetoRetornoServicoAutocomplete.obj.fid) {
            view.recuperarBairro(this.objetoRetornoServicoAutocomplete.obj.fid)
          } else {
            view.inicializaFormulario()
          }
        })
      } else if (this.currentView === 'ConsultaEmpresa') {
        this.setView('ConsultaEmpresa').then(view => {
        })
      }
      const currentView = null
      this.setCurrentView(currentView)
    }
  },
  watch: {
    currentView: function (view) {
      this.setViewEmpresa(view)
    }
  }
}
</script>
