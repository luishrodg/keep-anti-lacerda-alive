import cron from 'node-cron'
import express from 'express'
import cors from 'cors'
import axios from 'axios'

const ANTI_LACERDA_URL = 'https://anti-lacerda-app.herokuapp.com/'
let REQUEST_COUNT = 0

const app = express()

app.use(cors())

app.get('/', (_, res) => {
  return res.json({ message: `Já foi feito ${REQUEST_COUNT} requests` })
})

app.get('/keep', (_, res) => {
  return res.sendStatus(200)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Rodando')
})

cron.schedule('* * * * *', async () => {
  console.log('Fazendo request')
  const { data } = await axios.get(ANTI_LACERDA_URL)
  if (data) {
    console.log('Aplicação ativa')
    REQUEST_COUNT += 1
  } else {
    console.log('Aplicação inativa')
  }
})
