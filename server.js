const sqlite3 = require('sqlite3').verbose()
const DB_PATH = 'DB.sqlite3'
const express = require('express')
const bodyParser = require('body-parser')
const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')

    DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
        if (error){
            console.error("Pragma statement didn't work.")
        } else {
            console.log("Foreign Key Enforcement is on.")
        }
    })    

    DB.exec(dbSchema, function(err){
	    if (err) {
	        console.log('aqui ' + err)
	    }
	})

	//DB.close()
});

const app = express()
var montadora = []	

dbSchema = `CREATE TABLE IF NOT EXISTS MONTADORA (
	MONID integer NOT NULL PRIMARY KEY,
	MONNOME text(30)
);`

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function(){
	console.log('Server running on port 3000')	
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('index.ejs', {montadora: montadora})
})

app.post('/show', (req, res) => {	
	//console.log(req.body.name)
	DB.run('INSERT INTO MONTADORA (MONNOME) VALUES (?)',[req.body.name])
	DB.all('SELECT * FROM MONTADORA',(err, results) => {
		console.log(results)		
		res.render('index', {montadora: results});
	})
})




