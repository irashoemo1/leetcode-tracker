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
            
            let problemItems = await Problems.find({userId: request.user.id}).limit(limit).skip((page - 1) * limit);
            let allProblems = await Problems.find({userId: request.user.id})
            patterns = []
            
            for(let i = 0; i < allProblems.length; i++)
            {
                patterns.push(allProblems[i].pattern)
            }

            // console.log(patterns)
            if(request.query.patternType != undefined){
                problemItems = await Problems.find({pattern: request.query.patternType});
                // console.log(request)
            }
            response.render('problems.ejs', {problems: problemItems, pats: patterns})
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
            description: request.body.description, date: request.body.date, link: request.body.link, userId: req.user.id})
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
}