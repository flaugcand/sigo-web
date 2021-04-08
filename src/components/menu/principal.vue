<template>
  <component :is="currentMenu" ref="menuComponent"/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MenuEmpresa from 'src/components/menu/empresa'

export default {
  name: 'Principal',
  components: {
    MenuEmpresa
  },

  methods: {
    ...mapActions({
      setCurrentMenu: 'app/setCurrentMenu',
    }),
    getMenuComponent () {
      return this.$refs.menuComponent
    }
  },

  computed: {
    ...mapState({
      currentMenu: state => state.app.currentMenu,
      mostraConsulta: state => state.app.mostraConsulta
    })
  }
}
</script>
