import {agregarEstadoModel, mostrarEstadosModel} from '../models/estadosModel.js';

export async function agregarEstado(req, res) {
    try {
        const nombre = req.body.nombre;
        const result = await agregarEstadoModel(nombre);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al agregar el estado");
    }
}

export async function mostrarEstados(req, res) {
    try {
        const result = await mostrarEstadosModel();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al mostrar los estados");
    }
}