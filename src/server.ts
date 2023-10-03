import http from 'http'

import api from './api'
import { connectMONGODB } from './services/mongodb'

const server = http.createServer(api)

;(async () => {
    await connectMONGODB()
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})()
