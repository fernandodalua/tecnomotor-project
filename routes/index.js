var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {page:'Home', menuId:'home'});
});

var montadora = [];

router.get('/montadora', function(req, res) {
	DB.run('INSERT INTO MONTADORA (MONNOME) VALUES (?)',[req.body.name]);
	DB.all('SELECT * FROM MONTADORA',(err, results) => {
		console.log(results);
		res.render('montadora', {page:'Montadora', menuId:'montadora', montadora: montadora});
	})
});

router.get('/veiculo', function(req, res) {
  res.render('veiculo', {page:'Veiculo', menuId:'veiculo'});
});

module.exports = router;
