const Problems = require('../models/Problems')

module.exports = {
    getProblems: async (request, response) => {
        try{
            const problemItems = await Problems.find();
        
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
    // editProblem: async (request, response) => {
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