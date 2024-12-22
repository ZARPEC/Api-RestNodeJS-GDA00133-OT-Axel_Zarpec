import {agregarCategoria,mostrarCategoriasModel, agregarSubCategoria,mostrarSubCategorias,modificarCategoriaModel,modificarSubCategoriaModel} from "../../models/categorias/categoriaModel.js";
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

export async function mostrarCategorias(req, res) {
  try {
    const result = await mostrarCategoriasModel();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al mostrar las categorias");
  }
}

export async function modificarCategoria(req, res) {
  try {
    const idCategoria = req.body.idCategoria;
    const nombreCategoria = req.body.nombreCategoria;
    const result = await modificarCategoriaModel(idCategoria, nombreCategoria);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al modificar la categoria");
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
    var categoriaGet = req.query.categoria;
    var subcategoriaGet = req.query.subcategoria;
    if (typeof subcategoriaGet == "undefined") {
      subcategoriaGet = null;
      const result = await mostrarSubCategorias(categoriaGet, subcategoriaGet);
      res.status(200).json(result);
    }else{
      const result = await mostrarSubCategorias(categoriaGet, subcategoriaGet);
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al mostrar las subcategorias");
  }
}

export async function modificarSubCategoria(req, res) {

  try {
    const idSubCategoria = req.body.idSubCategoria;
    const nombreSubCategoria = req.body.nombreSubCategoria;
    const subcategoria_padre = req.body.subcategoria_padre;
    const categoria_fk = req.body.categoria_fk;
    const result = await modificarSubCategoriaModel(idSubCategoria, nombreSubCategoria, subcategoria_padre, categoria_fk);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al modificar la subcategoria");
  }
}


export function pruebaGet(req, res) {
  let date_time = new Date();
 const dia = ("0" + date_time.getDate()).slice(-2);
  const mes = ("0" + (date_time.getMonth() + 1)).slice(-2);
  const anio = date_time.getFullYear();
  const hora = date_time.getHours();
  const minutos = date_time.getMinutes();
  const segundos = date_time.getSeconds();
  const fechain = anio + "/" + mes + "/" + dia + " " + hora + ":" + minutos + ":" + segundos;
  res.send(fechain);
}
