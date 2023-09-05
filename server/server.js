const express = require('express')
const path = require('path')
const { logger } = require('./middleware/logger') // <<< custom logger
const errorHandler = require('./middleware/errorHandler') // <<< custom bad-req logger
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
require('dotenv').config()
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

/* MONGOOSE CONNECTION */
connectDB()

/* CONFIGURATION */
const app = express()
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))

/* ROUTES */
app.use('/', require('./routes/root'))
app.use("/dashboard", require("./routes/dashboard"))
app.use("/management", require("./routes/management"))
app.use("/transactions", require("./routes/transactions"))
app.use("/analytics", require("./routes/analytics"))

/* UNRECOGNIZED ROUTES */ 
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

/* CATCH && LOG REQS NOT ALLOWED */ 
app.use(errorHandler)
 
/* LISTEN FOR REQUESTS, ONCE MONGODB CONNECTED */
const PORT = process.env.PORT || 7500

mongoose.connection.once('open',()=>{
    console.log('connected to MongoDB')
    app.listen(PORT,()=>{
        console.log(`server is running on port: ${PORT}`)
    })
})