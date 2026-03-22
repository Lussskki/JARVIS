import dotenv from "dotenv"
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import chatRouter from './routes/chatRoute.js'

dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use('/api', chatRouter)

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`JARVIS server running on port ${PORT}`)
})
