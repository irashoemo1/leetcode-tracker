const Problems = require('../models/Problems')

let problemItems
let patterns = []
let pattern
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
            
            problemItems = await Problems.find({userId: request.user.id}).limit(limit).skip((page - 1) * limit);
            let allProblems = await Problems.find({userId: request.user.id})
            patterns = []
            uid = request.user.id
            
            for(let i = 0; i < allProblems.length; i++)
            {
                patterns.push(allProblems[i].pattern)
            }

            // console.log(patterns)
            if(request.query.patternType != undefined){
                pattern = request.query.patternType
                problemItems = await Problems.find({pattern: request.query.patternType}).limit(limit).skip((page - 1) * limit);
                if(request.query.patternType == 'patterns'){
                    problemItems = await Problems.find({userId: request.user.id}).limit(limit).skip((page - 1) * limit)
                }
                // console.log(request)
            }
            response.render('problems.ejs', {problems: problemItems, pats: patterns})
        }catch(error){
            console.log(error)
        }
    },
    getSortedProblems: async (request, response) => {
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
            // let problemItems;
            // console.log(request.user._id.toString())
            let uid = request.user._id.toString()
            console.log(uid)
            if(uid){
                if(request.query.sortType == 'nameAsc' || request.query.sortType == 'nameDesc'){
                    Problems.createIndexes({problem: 1})
                    if(request.query.sortType == 'nameAsc'){
                        if(pattern == 'patterns' || pattern == undefined){
                            problemItems = await Problems.find({userId: uid}).sort({problem: 1}).limit(limit).skip((page - 1) * limit);
                        }
                        else{
                            problemItems = await Problems.find({pattern: pattern, userId: uid}).sort({problem: 1}).limit(limit).skip((page - 1) * limit);
                        }
                    }
                    else{
                        if(pattern == 'patterns' || pattern == undefined){
                            problemItems = await Problems.find({userId: uid}).sort({problem: -1}).limit(limit).skip((page - 1) * limit);
                        }
                        else{
                            problemItems = await Problems.find({pattern: pattern, userId: uid}).sort({problem: -1}).limit(limit).skip((page - 1) * limit);
                        }
                    }    
                }
                else if(request.query.sortType == 'dateAsc' || request.query.sortType == 'dateDesc'){
                    Problems.createIndexes({date: 1})
                    if(request.query.sortType == 'dateAsc'){
                        if(pattern == 'patterns' || pattern == undefined){
                            problemItems = await Problems.find({userId: uid}).sort({date: 1}).limit(limit).skip((page - 1) * limit);
                        }
                        else{
                            problemItems = await Problems.find({pattern: pattern, userId: uid}).sort({date: 1}).limit(limit).skip((page - 1) * limit);
                        }
                    }
                    else{
                        if(pattern == 'patterns' || pattern == undefined){
                            problemItems = await Problems.find({userId: uid}).sort({date: -1}).limit(limit).skip((page - 1) * limit);
                        }
                        else{
                            problemItems = await Problems.find({pattern: pattern, userId: uid}).sort({date: -1}).limit(limit).skip((page - 1) * limit);
                        }
                    }    
                }
            }
            
            response.render('problems.ejs', {problems: problemItems, pats: patterns})
        }catch(error){
            console.log(error)
        }
    },
    createProblems: async (request, response) => {
        try{
            await Problems.create({problem: request.body.problemItem, pattern: request.body.patternType,
            description: request.body.description, date: request.body.date, link: request.body.link, userId: request.user.id})
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
    // getEditProblem: async (request, response) => {
    //     try{
    //         console.log(request.body)
    //         response.render('problemsEdit.ejs', {problems: problemItems, pats: patterns, problemID: request.body.problemIdS})
    //     }
    //     catch(error){
    //         console.log(error)
    //     } 
    // },
    // editProblem: async (request, response) => {
    //     try{
    //         console.log(request.body)
    //         // await Problems.findOneAndUpdate(request.body.problemIdS, {problem: request.body.problemItem, pattern: request.body.patternType,
    //         //     description: request.body.description, date: request.body.date, link: request.body.link}) //todoIdFromJSFile
    //         // console.log('Edited Task')
    //         // response.json('Edited it')
    //     }
    //     catch(error){
    //         console.log(error)
    //     } 
    // }
}