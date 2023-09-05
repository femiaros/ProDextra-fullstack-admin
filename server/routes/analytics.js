const express = require('express')
const analyticsController = require('../controllers/analyticsController')
const router = express.Router()

router.route('/').get(analyticsController.getAnalyticsStats)

module.exports = router