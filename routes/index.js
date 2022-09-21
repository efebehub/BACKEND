import { express } from "express";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //const connDB = require('../database/db');
  console.log(req.e);
  res.render('index', { e: req.e });
});

router.get('/index', function(req, res, next) {
  //const connDB = require('../database/db');
  res.render('index', { e: req.e });
});


module.exports = router;