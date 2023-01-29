const path = require('path');
require('dotenv').config({path: path.resolve('./config/.env')});
const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
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

require('./config/passport')(passport)

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
app.use(logger('dev'))

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: "mongodb+srv://irashoemo1:leetheecoder@cluster0.fpekx.mongodb.net/test" }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', homeRoutes)
app.use('/problems', problemsRoutes)

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})