const Problems = require('../models/Problems')

module.exports = {
    getProblems: async (request, response) => {
        try{
            let problemItems = await Problems.find();
            // let problemItems = await Problems.find().sort({problem: 1});
            // console.log(request)
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
    // editProblem: async (request, response) => {
    //     try{
    //         // console.log(request.body)
    //         await Problems.findOneAndUpdate({_id: request.body.problemIdS});
    //         console.log('Edited Task')
    //         response.json('Edited it')
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
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