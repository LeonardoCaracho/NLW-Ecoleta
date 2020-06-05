import express from 'express'
import cors from 'cors'
import path from 'path'
import { errors } from 'celebrate'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

//serve aquivos estaticos
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))) 

app.use(errors()) //forma de retorno dos erros

app.listen(3333)
