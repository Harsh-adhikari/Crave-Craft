const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectDb = require("./config/connectionDb")
const cors = require("cors")

const PORT = process.env.PORT || 3000
connectDb()

app.use(express.json())


app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://your-frontend-url.vercel.app' 
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))

app.use(express.static("public"))

app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err)
    } else {
        console.log(`Server is listening on port ${PORT}`)
    }
})