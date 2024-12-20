import {AgregarOrdenModel} from '../models/ordenesModel.js';

export async function agregarOrden(req, res) {
    try{

        let date_time = new Date();
    const dia = ("0" + date_time.getDate()).slice(-2);
    const mes = ("0" + (date_time.getMonth() + 1)).slice(-2);
    const anio = date_time.getFullYear();
    const hora = date_time.getHours();
    const minutos = date_time.getMinutes();
    const segundos = date_time.getSeconds();
    const fechain =
      anio +
      "/" +
      mes +
      "/" +
      dia +
      " " +
      hora +
      ":" +
      minutos +
      ":" +
      segundos;


        const usuario = req.body.usuario_fk;
        const estado = req.body.estado_fk;
        const fecha = fechain;
        const direccion = req.body.direccion;
        const { detalles } = req.body;

        console.error(detalles);
        console.error('controlador');
        const result = await AgregarOrdenModel(usuario, estado, fecha, direccion, detalles);
        res.status(200).json(result);


    }catch(err){
        console.log(err);
        res.status(500).send('Error al agregar la orden');
    }

}