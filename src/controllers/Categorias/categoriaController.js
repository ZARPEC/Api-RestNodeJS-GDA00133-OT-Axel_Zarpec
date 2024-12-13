import {agregarCategoria,mostrarCategorias, agregarSubCategoria} from "../../models/categorias/categoriaModel.js";
//categorias
export async function AgregarCategoria(req, res) {
  try {
    const nombreCat= req.body.nombre; //Se captura el nombre de la categoria desde la peticion post del cliente
    const result = await agregarCategoria(nombreCat);//Se llama a la funcion agregarCategoria del modelo
    res.status(200).json(result);//Se envia la respuesta al cliente
  } catch (err) {
    console.log(err); //En caso de error se muestra el error
    res.status(500).send("Error al agregar la categoria"); //Se envia un mensaje de error al cliente
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

//subcategorias

export async function AgregarSubCategoria(req, res) {
  try {
    const nombreSubCat = req.body.nombreSubCategoria;
    const subcategoria_padre = req.body.subcategoria_padre;
    const categoria_fk = req.body.categoria_fk;
    const result = await agregarSubCategoria(nombreSubCat, subcategoria_padre, categoria_fk);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al agregar la subcategoria");
  }
}

export async function MostrarSubCategorias(req, res) {
  try {
    const result = await mostrarSubCategorias();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al mostrar las subcategorias");
  }
}


export function pruebaGet(req, res) {
  res.send(req.query);
}
