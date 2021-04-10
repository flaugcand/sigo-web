<template>
      <div class="col" >
        <div class="q-pa-md ">
          <div class="q-gutter-y-md">
            <div class="row q-gutter-x-md">
              <div class="col" >
                <q-input label="Nome Fantasia" v-model="nomeFantasia"
                  outlined class="col-md-6"
                  clearable
                  filled/>
              </div>  

              <div class="col" >
                <q-input label="Razão Social" v-model="razaoSocial"
                  outlined 
                  clearable
                  filled/>
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col" >
                <q-input label="CNPJ" v-model="cnpj"
                  outlined class="col-md-6"
                  clearable
                  filled/>
              </div>  
              
              <div class="col" >
                <q-input label="Inscrição Estadual" v-model="inscricaoEstadual"
                  outlined 
                  clearable
                  filled/>
              </div>
            </div>
            <div class="row q-gutter-x-md">
                <q-btn label="Consultar" class="bg-primary text-white" @click="consultar"/>
                <q-btn label="Novo" class="bg-green text-white" @click="novo"/>
            </div>
          </div>
        </div>

        <q-separator/>
        <div class="q-pa-md">
          <q-table
            :data="data"
            :columns="columns"
            flat
            :loading="loading"
            no-data-label="Sem dados a exibir" >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th class="text-left" v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    :style="col.style">
                    {{ col.label }}
                  </q-th>
                  <q-th auto-width>
                    Ações
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    :style="col.style"
                    @click="editar(props.row)">
                    {{ col.value }}
                  </q-td>
                  <q-td>
                    <q-btn icon="delete" class="bg-red text-white" @click="excluir(props.row)">
                      <q-tooltip>Excluir Registro</q-tooltip>
                    </q-btn>
                  </q-td>
                </q-tr>
              </template>
          </q-table>
        </div>
      </div>
</template>

<script>
import empresaService from 'src/service/empresa'
import dialogService from 'src/service/dialogService'
import messageService from 'src/service/messageService'
import { mapActions, mapState } from 'vuex'

export default {
  inject: ['setView'],
  name: 'ConsultaEmpresa',
  data () {
    return {
      nomeFantasia: null,
      razaoSocial: null,
      cnpj: null,
      inscricaoEstadual: null,
      data: [],
      columns: [
        {
          name: 'nomeFantasia',
          field: 'nomeFantasia',
          required: true,
          label: 'Nome Fantasia',
          align: 'left',
          sortable: true
        },
        {
          name: 'razaoSocial',
          field: 'razaoSocial',
          required: true,
          label: 'Razão Social',
          align: 'left',
          sortable: true
        },
        {
          name: 'cnpj',
          field: 'cnpj',
          required: true,
          label: 'CNPJ',
          align: 'left',
          sortable: true
        },
        {
          name: 'inscricaoEstadual',
          field: 'inscricaoEstadual',
          required: true,
          label: 'Inscrição Estadual',
          align: 'left',
          sortable: true
        }
      ],
      loading: false
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
    consultar() {
      empresaService.consultar({
          nomeFantasia: this.nomeFantasia,
          razaoSocial: this.razaoSocial, 
          cnpj: this.cnpj,
          inscricaoEstadual: this.inscricaoEstadual
        }).then(response => {
        this.data = response
        this.data = response
      })
    },
    editar (obj) {
      this.setView('FormularioEmpresa').then(view => {
        view.carregarObjeto(obj)
      })
      this.setMostraConsulta(false)
    },
    excluir (obj) {
      dialogService.confirm('Exclusão', 'Deseja excluir o registro selecionado?', 
        () =>{
          empresaService.excluir(obj.id).then(response => {
            this.consultar()
            messageService.sucesso('Registro excluído com sucesso.')
          }).catch(error => {
            messageService.sucesso('Erro ao excluir o registro selecioado.')
          })
        },
        () => {})
    },
    novo () {
      this.setView('FormularioEmpresa')
      this.setMostraConsulta(false)
    }
  } 
}
</script>
