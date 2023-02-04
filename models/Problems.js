const mongoose = require('mongoose')

const ProblemsSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
})

const Problems = mongoose.model('Problems', ProblemsSchema)

module.exports = {
    Problems,
    editData: function(editId, callback){
       var userData = Problems.findById(editId);
       userData.exec(function(err, data){
        if(err) throw err;
        return callback(data);
     })
    },
    updateData: function(inputData, editId, callback){            
     userData = Problems.findByIdAndUpdate(editId, inputData);
     userData.exec(function(err, data){
       if (err) throw err;
        return callback(data);
     })
  },
}
// module.exports = mongoose.model('Problems', ProblemsSchema)