const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://irashoemo1:leetheecoder@cluster0.fpekx.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB