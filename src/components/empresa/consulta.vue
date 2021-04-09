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
                <q-input label="Razão Social" v-model="nomeFantasia"
                  outlined 
                  clearable
                  filled/>
              </div>
            </div>
            <div class="row q-gutter-x-md">
              <div class="col" >
                <q-input label="CNPJ" v-model="nomeFantasia"
                  outlined class="col-md-6"
                  clearable
                  filled/>
              </div>  
              
              <div class="col" >
                <q-input label="Inscrição Estadual" v-model="nomeFantasia"
                  outlined 
                  clearable
                  filled/>
              </div>
            </div>
            <div class="row q-gutter-x-md">
                <q-btn label="Consultar" class="bg-primary text-white"/>
                <q-btn label="Novo" class="bg-green text-white" @click="novo"/>
            </div>
          </div>
        </div>

        <q-separator/>
        <div class="q-pa-md">
          <q-table
            :data="dataTabela"
            :columns="columns"
            flat
            :loading="loading"
            no-data-label="Sem dados a exibir" >
              <!-- <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th class="text-left" v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    :style="col.style">
                    {{ col.label }}
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
                </q-tr>
              </template> -->
          </q-table>
        </div>
      </div>
</template>

<script>
import empresaService from 'src/service/empresa'
import messagemService from 'src/service/messageService'
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
      dataTabela: [],
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
    
    editar (obj) {
      this.setView('FormularioEmpresa').then(view => {
        view.carregarDadosRegistro(obj)
      })
      this.setMostraConsulta(false)
    },
    novo () {
      this.setView('FormularioEmpresa')
      this.setMostraConsulta(false)
    }
  },
  mounted () {
    empresaService.consultar({}).then(response => {
      this.data = response
      this.dataTabela = response

    })
  } 
}
</script>
