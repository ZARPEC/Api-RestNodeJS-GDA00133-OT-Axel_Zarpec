import { MostrarUnidadMedidaModel } from "../models/unidadMedidaModel.js";

export async function MostrarUnidadMedida(req, res) {
    try {
        const result = await MostrarUnidadMedidaModel();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al mostrar las unidades de medida");
    }
}