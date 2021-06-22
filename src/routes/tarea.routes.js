const express = require('express');
const router = express.Router();

const Tarea=require('../models/tarea');

//Listado de tareas guardadas
router.get('/', async(req, res) => {
    const tareas = await Tarea.find();
   
    res.json(tareas);
});

//Buscar una tarea
router.get('/:id', async(req, res) => {
    const tarea = await Tarea.findById(req.params.id);
    res.json(tarea);
});

//Guardo una tarea
router.post('/', async(req, res) => {
    const { titulo, descripcion } = req.body;
    const tarea = new Tarea({titulo, descripcion});
    await tarea.save();
   
    res.json({status:'Guardado'});
});

//Actualizar una tarea
router.put('/:id', async(req, res) => {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = {titulo, descripcion};
    await Tarea.findByIdAndUpdate(req.params.id, nuevaTarea);
    res.json({status:'Actualizado'});
});

//Eliminar una tarea
router.delete('/:id', async(req, res) => {
    await Tarea.findByIdAndRemove(req.params.id);
    res.json({status:'Eliminado'});
});

module.exports = router;