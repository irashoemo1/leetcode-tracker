const Problems = require('../models/Problems')

module.exports = {
    getProblems: async (request, response) => {
        try{
            let {page, limit} = request.query;//might need parseInt()
            if(!page)
                page = 1
            if(!limit)
                limit = 20
            
            let numOfResults = await Problems.countDocuments()
            let numOfPages = numOfResults / limit

            if(page > numOfPages)
            {
                page = numOfPages
            }
            else if(page < 1)
            {
                page = 1
            }
            
            // let problemItems = await Problems.find()
            // if(request.query.page != undefined){
            //     console.log(request.query.page)
            // }
            

            let problemItems = await Problems.find().limit(limit).skip((page - 1) * limit);
            if(request.query.patternType != undefined){
                problemItems = await Problems.find({pattern: request.query.patternType});
                // console.log(request)
            }
            response.render('problems.ejs', {problems: problemItems})
        }catch(error){
            console.log(error)
        }
    },
    getSortedProblems: async (request, response) => {
        try{
            let problemItems;
            if(request.query.sortType == 'nameAsc' || request.query.sortType == 'nameDesc'){
                Problems.createIndexes({problem: 1})
                if(request.query.sortType == 'nameAsc'){
                    problemItems = await Problems.find().sort({problem: 1});
                }
                else{
                    problemItems = await Problems.find().sort({problem: -1});
                }    
            }
            else if(request.query.sortType == 'dateAsc' || request.query.sortType == 'dateDesc'){
                Problems.createIndexes({date: 1})
                if(request.query.sortType == 'dateAsc'){
                    problemItems = await Problems.find().sort({date: 1});
                }
                else{
                    problemItems = await Problems.find().sort({date: -1});
                }    
            }
            // console.log(request)
            response.render('problems.ejs', {problems: problemItems})
        }catch(error){
            console.log(error)
        }
    },
    createProblems: async (request, response) => {
        try{
            await Problems.create({problem: request.body.problemItem, pattern: request.body.patternType,
            description: request.body.description, date: request.body.date, link: request.body.link})
            console.log('Problem Added')
            response.redirect('/problems')
        }catch(error){
            console.log(error)
        }
    },
    deleteProblem: async (request, response) => {
        try{
            await Problems.findOneAndDelete({_id: request.body.problemIdS}) //todoIdFromJSFile
            console.log('Deleted Task')
            response.json('Deleted it')
        }
        catch(error){
            console.log(error)
        } 
    },
    // // adds link
    // addLink: async (request, response) => {
    //     const problem = request.body.problemNameS;
    //     console.log(request.body)
    //     try{
    //         await Problems.findOneAndUpdate({_id: request.body.problemIdS, problem: request.body.problemNameS}, {
    //             $set: {
    //                 link: `https://leetcode.com/problems/${problem.replace(/ /g,'-').toLowerCase()}/`}
    //             })
    //         console.log('Updated Link')
    //         response.json('Updated it')
    //     }
    //     catch(error){
    //         console.log(error)
    //     } 
    // }
}

// function paginatedResults(model) {
//     return async (request, response, next) => {
//       //const page = parseInt(req.query.page)
//       //const limit = parseInt(req.query.limit)
//       const page = 1
//       const limit = 10
  
//       const startIndex = (page - 1) * limit
//       const endIndex = page * limit
  
//       const results = {}
  
//       if (endIndex < await model.countDocuments().exec()) {
//         results.next = {
//           page: page + 1,
//           limit: limit
//         }
//       }
      
//       if (startIndex > 0) {
//         results.previous = {
//           page: page - 1,
//           limit: limit
//         }
//       }
//       try {
//             results.results = await model.find().limit(limit).skip(startIndex).exec()
//             response.paginatedResults = results
//             next()
//       } catch (e) {
//         res.status(500).json({ message: e.message })
//       }
//     }
//   }