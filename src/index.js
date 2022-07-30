import {config} from "dotenv"
config()
import express from "express"
import controller from "./controller.js";

const port = process.env.PORT ?? 3000

const app = express()

app.use(express.json())

app.get('/rate', controller.rate)

// app.post('/subscribe', )
// app.post('/sendEmails', )

app.listen(port, async () => {
    console.log(`App started on port ${port}`)
})