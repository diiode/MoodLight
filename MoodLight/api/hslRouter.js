var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json(req.app.locals.hsl);
});

router.post('/', function (req, res) {
    console.log(req.body);
    req.app.locals.hsl.hue = req.body.hue;
    req.app.locals.hsl.sat = req.body.sat;
    req.app.locals.hsl.lum = req.body.lum;
    res.send(req.app.locals.hsl);
});

module.exports = router;