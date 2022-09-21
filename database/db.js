import mysql from 'mysql'

//console.log(process.env.DB_HOST);
/*
const connDB = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
})
*/
const connDB = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database : 'jugadores'
})

connDB.connect( (error)=> {
    if (error) {
        console.log('Error de conexion a la base de datos: '+error);
        return;
    } else {
        console.log('Conexion a la base de datos: OK');
    }
});

export default connDB;