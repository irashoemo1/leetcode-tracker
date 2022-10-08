require('dotenv').config({path: './config/.env'});
const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const problemsRoutes = require('./routes/problems')
const PORT = 2121;
const moment = require("moment");

app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });

app.use(cors());

connectDB();
// const clientP = mongoose.connect(process.env.DB_STRING, {
//     useNewURLParser: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: false
// }).then(result => result.connection.getClient())

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', homeRoutes)
app.use('/problems', problemsRoutes)

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})