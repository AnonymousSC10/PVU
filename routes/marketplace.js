var express = require('express'),
    router = express.Router();

function view_plant(req, res, next) {
    res.render('marketplace/plant')
}

function view_mothertree(req, res, next) {
    res.render('marketplace/mother-tree')
}

function view_puzzle(req, res, next) {
    res.render('marketplace/puzzle')
}

/* GET marketplace page */
router.get('/plant', view_plant)
router.get('/mother-tree', view_mothertree)
router.get('/puzzle', view_puzzle)

module.exports = router