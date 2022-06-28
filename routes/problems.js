const express = require('express')
const router = express.Router()
const problemsController = require('../controllers/problems')

router.get('/', problemsController.getProblems)

router.post('/createProblems', problemsController.createProblems)

router.get('/sorted', problemsController.getSortedProblems)

// router.put('/editProblem', problemsController.editProblem)

// router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteProblem', problemsController.deleteProblem)

module.exports = router