const mongoose = require('mongoose');//Orm
const URI = 'mongodb://localhost/agendar-tareas';

mongoose.connect(URI)
    .then(db => console.log('Conexion a base de datos exitosa'))
    .catch(err => console.log(err));


module.exports = mongoose;