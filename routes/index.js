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
var veiculo = [];
var conector = [];

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
	DB.all('SELECT * FROM VEICULO',(err, results) => {
		console.log(results);
		res.render('veiculo', {page:'Veiculo', menuId:'veiculo', veiculo: results});
	})
});

router.post('/cadastraveiculo', function(req, res) {
	DB.run('INSERT INTO VEICULO (VEINOME) VALUES (?)',[req.body.name]);
        DB.all('SELECT * FROM VEICULO',(err, results) => {
                console.log(results);
                res.render('veiculo', {page:'Veiculo', menuId:'veiculo', veiculo: results});
        })
});

router.get('/conector', function(req, res) {
	DB.all('SELECT * FROM CONECTOR',(err, results) => {
		console.log(results);
		res.render('conector', {page:'Conector', menuId:'conector', conector: results});
	})
});

router.post('/cadastraconector', function(req, res) {
	DB.run('INSERT INTO CONECTOR (CONNOME) VALUES (?)',[req.body.name]);
        DB.all('SELECT * FROM CONECTOR',(err, results) => {
                console.log(results);
                res.render('conector', {page:'Conector', menuId:'conector', conector: results});
        })
});

module.exports = router;
