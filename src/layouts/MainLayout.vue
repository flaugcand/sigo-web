<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          SIGO - Sistema Integrado de Gestão Operacional
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <div class="" style="">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Menu</q-toolbar-title>
        </q-toolbar>
        <q-list class="bg-blue-2 text-blue-10">
           <q-item clickable v-ripple>
              <q-item-section @click="cadastrarEmpresa()">Empresa</q-item-section>
            </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      left: false
    }
  },
  methods: {
    ...mapActions({
      setCurrentMenu: 'app/setCurrentMenu',
      setCurrentView: 'app/setCurrentView',
      setMostraConsulta: 'app/setMostraConsulta'
    }),
     cadastrarEmpresa () {
      this.setCurrentMenu('MenuEmpresa')
      this.setMostraConsulta(true)
      this.setCurrentView('ConsultaEmpresa')
    }
  }
}
</script>