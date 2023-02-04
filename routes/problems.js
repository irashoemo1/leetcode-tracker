const express = require('express')
const router = express.Router()
const problemsController = require('../controllers/problems')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, problemsController.getProblems)

router.post('/createProblems', problemsController.createProblems)

router.get('/sorted', problemsController.getSortedProblems)

router.delete('/deleteProblem', problemsController.deleteProblem)

router.get('/editProblem/:id', problemsController.editData)

router.post('/editProblem/:id', problemsController.updateData)

module.exports = router