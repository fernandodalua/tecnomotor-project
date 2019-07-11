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
  res.render('index', {page:'Home', menuId:'home', montadora: montadora});
});

var montadora = [];
//var veiculo = [];
//var conector = [];
//var sistema = [];
//var tiposistema = [];

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
		montadora = results;
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

router.get('/sistema', function(req, res) {
	DB.all('SELECT * FROM SISTEMA',(err, results) => {
		console.log(results);
		res.render('sistema', {page:'Sistema', menuId:'sistema', sistema: results});
	})
});

router.post('/cadastrasistema', function(req, res) {
	DB.run('INSERT INTO SISTEMA (SISNOME) VALUES (?)',[req.body.name]);
        DB.all('SELECT * FROM SISTEMA',(err, results) => {
                console.log(results);
                res.render('sistema', {page:'Sistema', menuId:'sistema', sistema: results});
        })
});

router.get('/tiposistema', function(req, res) {
	DB.all('SELECT * FROM TIPOSISTEMA',(err, results) => {
		console.log(results);
		res.render('tiposistema', {page:'Tipo do Sistema', menuId:'tiposistema', tiposistema: results});
	})
});

router.post('/cadastratiposistema', function(req, res) {
	DB.run('INSERT INTO TIPOSISTEMA (TPSNOME) VALUES (?)',[req.body.name]);
        DB.all('SELECT * FROM TIPOSISTEMA',(err, results) => {
                console.log(results);
                res.render('tiposistema', {page:'Tipo do Sistema', menuId:'tiposistema', tiposistema: results});
        })
});

module.exports = router;
