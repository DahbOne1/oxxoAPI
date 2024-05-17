import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createOxxoRouter } from './routes/oxxos.js'

export const createApp = ({ oxxoModel }) => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')

    app.get('/', (req, res) => {
        res.json({ message: 'Oxxo Cerca' })
    })

    app.use("/oxxos", createOxxoRouter({ oxxoModel }))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`Server listening in port http://localhost:${PORT}`)
    })

}
