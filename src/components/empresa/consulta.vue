<template>
  <div>My component</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ConsultaEmpresa',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      mostraConsulta: state => state.app.mostraConsulta,
      currentMenu: state => state.app.currentMenu,
      filtroTabela: state => state.app.filtroTabela
    })
  },
  methods: {
    ...mapActions({
      setCepSelecionado: 'app/setCepSelecionado',
      setMostraConsulta: 'app/setMostraConsulta'
    }),
  }
}
</script>
