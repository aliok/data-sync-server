process.env.POSTGRES_USERNAME = 'postgresql'
process.env.POSTGRES_PASSWORD = 'postgres'
process.env.POSTGRES_DATABASE = 'aerogear_data_sync_db'
process.env.POSTGRES_HOST = '127.0.0.1'
process.env.POSTGRES_PORT = '5432'

const config = require('./server/config')
let {postgresConfig} = config
console.log(postgresConfig)

const PGPubsub = require('pg-pubsub')

var pubsubInstance = new PGPubsub({
  user: postgresConfig.username,
  host: postgresConfig.host,
  database: postgresConfig.database,
  password: postgresConfig.password,
  port: postgresConfig.port
})

pubsubInstance.publish('aerogear-data-sync-config', {})

// setInterval(function () {
//   pubsubInstance.publish('aerogear-data-sync-config', {})
// }, 100)
