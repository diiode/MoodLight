var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json(req.app.locals.status);
});

module.exports = router;