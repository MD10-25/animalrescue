require("dotenv").config()
const express = require("express")  // dette er et common js import
// import express from "express"  // dette er et es 6 import 
const cors = require("cors")
const animals = require("./routes/animals.routes")


const app = express()

// import db-connection
require("./db")

// serve docs
app.use("/", express.static("docs"))

// accept request from anywhere
app.use(cors())

// expect incoming data to be json
app.use(express.json())

// routes
app.use("/api/v1", animals)


app.listen(4000, () => {
    console.log("Listening for requests on port 4000")
})