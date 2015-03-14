var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    console.log(req.app.locals.power);
    res.json(req.app.locals.power);
})

router.post('/', function (req, res) {
    console.log(req.body)
    req.app.locals.power = req.body;
    res.send(req.app.locals.power);
})

module.exports = router;