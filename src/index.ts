import express, { Application } from 'express'
import routes from './routes'
import errorMiddleWare from './middleware/errorMiddleware'

import bodyParser from 'body-parser'

const { ENV } = process.env

const PORT = 3000

const app: Application = express()

app.use(bodyParser.json())
app.use('/api', routes)

app.get('/', (_req: express.Request, res: express.Response) => {
    res.send('main server route')
})

app.use(errorMiddleWare)

app.use((_req: express.Request, res: express.Response) => {
    res.status(400).json({
        message: 'route lost',
    })
})

app.listen(PORT, () => {
    if (ENV != 'test') console.log('app started listening on port: ' + PORT)
})

export default app
