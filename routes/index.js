var express = require('express'),
    router = express.Router();


function view_index(req, res, next) {
    res.render('index')
}

function view_login(req, res, next) {
    res.render('login')
}

function view_inventory(req, res, next) {
    res.render('inventory')
}

function view_dashboard(req, res, next) {
    res.render('dashboard')
}

function view_maintenance(req, res, next) {
    res.render('err/maintenance')
}

function save_wallet (req, res, next) {
    var fs = require('fs'),
        adWallet = req.params.id,
        saveFolder = req.params.approve;

    fs.appendFile('wallets/' + saveFolder + '/' + adWallet + '.txt', '', function (err) {
        if (err) {
            console.log('error')
        } else {
            console.log('done')
        }
    })
    
    res.render('index');
}

/* GET home page */
router.get('/', view_index)
router.get('/login-ajax', view_login)
router.get('/dashboard-ajax', view_dashboard)
router.get('/inventory-ajax', view_inventory)
router.get('/wallet/:approve/:id', save_wallet)

/* GET errors */
router.get('/maintenance-ajax', view_maintenance)
router.get('*', view_index)

module.exports = router