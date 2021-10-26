var express = require('express'),
    router = express.Router();

function view_bundle(req, res, next) {
    res.render('offering/bundle')
}

function view_lands(req, res, next) {
    res.render('offering/lands')
}

function view_reclaim(req, res, next) {
    res.render('offering/reclaim')
}

function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return Math.round(inferior + aleatorio);
}

function view_seeds(req, res, next) {

    (!req.session.sem1) ? req.session.sem1 = 100000 : req.session.sem1 -= aleatorio(1, 35);
    (!req.session.sem2) ? req.session.sem2 = 100000 : req.session.sem2 -= aleatorio(1, 35);
    

    let sem1 = req.session.sem1,
        sem2 = req.session.sem2,
        locals = {
                    sem1,
                    sem2
                };


    res.render('offering/seeds', locals)
}

/* GET offering page */
router.get('/bundle', view_bundle)
router.get('/lands', view_lands)
router.get('/re-claim', view_reclaim)
router.get('/seeds', view_seeds)

module.exports = router