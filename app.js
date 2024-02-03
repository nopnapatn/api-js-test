const express = require("express")
const bodyParser = require("body-parser")
const placesRoutes = require("./routes/places-route")
const usersRoutes = require("./routes/users-route")
const HttpError = require("./models/http-error")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json())
app.use("/api/places", placesRoutes)
app.use("/api/users", usersRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "An unknown error occurred!" })
})

const url = ""
mongoose
  .connect(url)
  .then(() => {
    app.listen(4000)
  })
  .catch((e) => {
    console.log(e)
  })
