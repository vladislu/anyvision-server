const express = require('express')
const router = express.Router()

const searchController = require('../controllers/search')

router.post('/', searchController.addSearch)
router.get('/top10', searchController.getTop10Searching)

module.exports = router