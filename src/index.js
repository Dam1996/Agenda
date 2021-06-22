//Instalo el framework
const express = require('express');
//Instalo el modulo
const morgan = require('morgan');
//Creo el modulo path
const path = require('path');//Para unir los directorios de forma multiplataforma con los sistemas operativos
//Creo el modulo app
const app = express();

//Conexion orm
const { mongoose } = require('./database');

//Configuracion de puerto
app.set('port', process.env.PORT || 3000 );


// Middlewar morgan
app.use(morgan('dev'));//mostrar peticiones del cliente por consola
// Middlewar json
app.use(express.json());//convertir los datos de las peticiones cliente-servidor en formato json


//Creo la ruta principal
app.use('/api/tareas',require('./routes/tarea.routes'));
// Html estatico
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando el servidor
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})