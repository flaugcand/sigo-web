<template>
  <div class="col" >
    <div class="q-pa-md ">
      <div class="q-gutter-y-md">
        <div class="row q-gutter-x-md">
          <div class="col" >
            <q-input label="Nome Fantasia" v-model="model.nomeFantasia"
              outlined class="col-md-6"
              clearable
              filled 
              :rules="[val => !!val || 'Campo obrigatório.']"/>
          </div>  
        </div>
        <div class="row q-gutter-x-md">
          <div class="col" >
            <q-input label="Razão Social" v-model="model.razaoSocial"
              outlined 
              clearable
              filled 
              :rules="[val => !!val || 'Campo obrigatório.']"/>
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div class="col" >
            <q-input label="CNPJ" v-model="model.cnpj"
              outlined class="col-md-6"
              clearable
              filled
              :rules="[val => !!val || 'Campo obrigatório.']" />
          </div>  
          
          <div class="col" >
            <q-input label="Inscrição Estadual" v-model="model.inscricaoEstadual"
              outlined 
              clearable
              filled />
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <div class="col" >
            <q-input label="Observações"
              v-model="model.observacao"
              filled
              type="textarea"
            />
          </div>
        </div>
        <div class="row q-gutter-x-md">
            <q-btn label="Cancelar" class="bg-red text-white" @click="cancelar"/>
            <q-btn label="Salvar" class="bg-green text-white" @click="salvar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import empresaService from 'src/service/empresa'
import messagemService from 'src/service/messageService'
import { mapActions, mapState } from 'vuex'

export default {
  inject: ['setView'],
  name: 'FormularioEmpresa',
  data () {
    return {
      model: {}
    }
  },
  computed: {
    ...mapState({
      mostraConsulta: state => state.app.mostraConsulta
    })
  },
  methods: {
    ...mapActions({
      setCurrentView: 'app/setCurrentView',
      setMostraConsulta: 'app/setMostraConsulta'
    }),
    inicializaFormulario () {
      this.model = {}
      this.resetValidationRules();
    },
    resetValidationRules () {
      const elements = Object.values(this.$refs)
      elements.forEach(element => {
        if (element.resetValidation) element.resetValidation()
      })
    },
    cancelar () {
      this.inicializaFormulario()
      this.setView('ConsultaEmpresa')
    }, 
    salvar () {
      if(!this.model.cnpj || !this.model.nomeFantasia || !this.model.razaoSocial)  {
        messagemService.erro('Campos obrigatórios não preechidos')
        return
      }
      this.$q.loading.show()
      empresaService.salvar(this.model).then(response => {
        debugger
        messagemService.sucesso('Registro salvo com sucesso!')
        this.cancelar()
        this.$q.loading.hide()
      }).catch(erro => {
        debugger
        messagemService.erro('Ocorreum uma falha ao salvar o registro.')
        this.$q.loading.hide()
      })
    }
  }
}
</script>
