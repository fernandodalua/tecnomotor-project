var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var DB_PATH = 'DB.sqlite3';

const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {page:'Home', menuId:'home'});
});

var montadora = [];

router.get('/montadora', function(req, res) {	
	DB.all('SELECT * FROM MONTADORA',(err, results) => {
		console.log(results);
		res.render('montadora', {page:'Montadora', menuId:'montadora', montadora: results});
	})
});

router.post('/cadastramontadora', function(req, res) {
	DB.run('INSERT INTO MONTADORA (MONNOME) VALUES (?)',[req.body.name]);
	DB.all('SELECT * FROM MONTADORA',(err, results) => {
		console.log(results);
		res.render('montadora', {page:'Montadora', menuId:'montadora', montadora: results});
	})
});

router.get('/veiculo', function(req, res) {
  res.render('veiculo', {page:'Veiculo', menuId:'veiculo'});
});

module.exports = router;
