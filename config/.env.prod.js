var merge = require('webpack-merge')
var prodEnv = require('./.env.prod')

module.exports = merge(prodEnv, {
    NODE_ENV: '"production"',
    API: 'http://localhost:8081/sigo-seguranca-api'
})
