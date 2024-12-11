import {agregarCategoria,mostrarCategorias} from "../../models/categorias/categoriaModel.js";

export async function AgregarCategoria(req, res) {
  try {
    const { nombreCategoria } = req.body;
    const result = await agregarCategoria(nombreCategoria);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al agregar la categoria");
  }
}

export async function mostrarCategoriasModel(req, res) {
  try {
    const result = await mostrarCategorias();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al mostrar las categorias");
  }
}
