const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const passport = require("passport")

dotenv.config()

const app = express()

app.use(express.json())


app.get("/", (req, res) => {
  res.send("hello world")
})




const PORT = process.env.PORT || 4000
mongoose
  .connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {}
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
