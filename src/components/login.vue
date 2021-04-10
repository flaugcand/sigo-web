<template>
  <div class="fullscreen q-pa-md flex flex-center bg-indigo-1">
    <div>
      <div class="q-pa-lg flex flex-center bg-blue-grey-5 text-h3 text-weight-medium text-blue-grey-2">
        Login - SIGO
      </div>
      <div class="q-pa-md q-gutter-y-md bg-grey-3 ">
        <q-input
          filled
          outlined
          label="Login"
          v-model="model.username"
          :rules="[val => !!val || 'Login é obrigatório']" />
        <q-input label="Senha" 
          v-model="model.password" 
          filled 
          outlined
          :type="isPwd ? 'password' : 'text'"
          :rules="[val => !!val || 'Senha é obrigatória']">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="row q-gutter-x-md flex flex-center">
          <q-btn label="Limpar" class="bg-red text-white" @click="limpar"/>
          <q-btn label="Salvar" class="bg-green text-white" @click="login" :disable="!isValid"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authService from 'src/service/authService'
import messageService from 'src/service/messageService'
export default {
  name: 'Login',
  data () {
    return {
      model : {},
      isPwd: true
    }
  },
  mounted () {
    this.validate()
  },
  computed: {
    isValid () {
      return this.model.username && this.model.password
    }
  },
  methods: {
    validate () {
      if (authService.check()) {
        this.$router.push({ name: 'home'})
      } else if (!authService.check()) {
        this.$router.push({ name: 'login' })
      }
    },
    limpar () {
      this.model = {}
      this.resetValidationRules()
    },
    login () {
      authService.authentication(this.model).then(response => {
        sessionStorage.setItem('token', response.data)
        this.$router.push({ name: 'home' })
        messageService.sucesso('Autenticação realizada com sucesso.')
      }).catch(error => {
        messageService.erro('Login ou Senha inválidos.')
      })
    },
    resetValidationRules () {
      const elements = Object.values(this.$refs)
      elements.forEach(element => {
        if (element.resetValidation) element.resetValidation()
      })
    }
  }
}
</script>
