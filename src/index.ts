import express, { Application } from 'express'
import routes from './routes'

import bodyParser from 'body-parser'

const { ENV } = process.env

const PORT = 3000

const app: Application = express()

app.use(bodyParser.json())
app.use('/api', routes)

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('main server route')
})

app.listen(PORT, () => {
    if (ENV != 'test') console.log('app started listening on port: ' + PORT)
})

export default app
