const sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'DB.sqlite3';

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

	DB.close()
});

dbSchema = `CREATE TABLE IF NOT EXISTS MONTADORA (
	MONID integer NOT NULL PRIMARY KEY,
	MONNOME text(30)
);
	CREATE TABLE IF NOT EXISTS VEICULO (
	VEIID integer NOT NULL PRIMARY KEY,
	VEINOME text(30)
);
	CREATE TABLE IF NOT EXISTS CONECTOR (
	CONID integer NOT NULL PRIMARY KEY,
	CONNOME text(30)
);
	CREATE TABLE IF NOT EXISTS SISTEMA (
	SISID integer NOT NULL PRIMARY KEY,
	SISNOME text(30)
);
	CREATE TABLE IF NOT EXISTS TIPOSISTEMA (
	TPSID integer NOT NULL PRIMARY KEY,
	TPSNOME text(30)
);
	CREATE TABLE IF NOT EXISTS APLICACAO (
	APLID integer NOT NULL PRIMARY KEY,
	APLANOINICIAL integer,
	APLANOFINAL integer,
	MONID integer,
	VEIID integer,
	CONID integer,
	SISID integer,
	TPSID integer,
	FOREIGN KEY(MONID) REFERENCES MONTADORA(MONID),
	FOREIGN KEY(VEIID) REFERENCES VEICULO(VEIID),
	FOREIGN KEY(CONID) REFERENCES CONECTOR(CONID),
	FOREIGN KEY(SISID) REFERENCES SISTEMA(SISID),
	FOREIGN KEY(TPSID) REFERENCES TIPOSISTEMA(TPSID)
);`

module.exports = database;