const express = require('express')
const managementController = require('../controllers/managementController')
const router = express.Router()

router.route('/customers').get(managementController.getAllCustomers)
router.route('/actives').get(managementController.getActiveCustomers)
router.route('/members').get(managementController.getMemberCustomers)

module.exports = router