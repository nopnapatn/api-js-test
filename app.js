const express = require("express")
const bodyParser = require("body-parser")
const placesRoutes = require("./routes/places-route")
const app = express()

app.use("/api/places", placesRoutes)

app.listen(4000)
