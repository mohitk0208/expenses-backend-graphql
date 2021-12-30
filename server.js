const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(express.json())


app.get("/", (req, res) => {
  res.send("hello world")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})