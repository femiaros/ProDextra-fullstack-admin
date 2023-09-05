const express = require('express')
const transactionsController = require('../controllers/transactionsController')
const router = express.Router()
 
router.route('/').get(transactionsController.getTransactions)

module.exports = router