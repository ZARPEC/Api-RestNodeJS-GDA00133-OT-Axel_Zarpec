import {mostrarProductos,agregarProducto} from "../../models/productos/productosModel.js";

export async function AgregarProducto(req, res) {
  try {
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

    const nombreP = req.body.nombre_producto;
    const medidaCant = req.body.cantidad_medida;
    const unidadMedida = req.body.unidad_medida_fk;
    const subcategoria = req.body.subcategoria_fk;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const rutaimg = req.body.ruta_img;
    const fechaIngreso = fechain;
    const estado = req.body.estado_fk;
    const result = await agregarProducto(
      nombreP,
      medidaCant,
      unidadMedida,
      subcategoria,
      precio,
      stock,
      rutaimg,
      fechaIngreso,
      estado
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al agregar el producto");
  }
}

export async function MostrarProductos(req, res) {
  try {
    var categoria = req.query.categoria;
    var subcategoria = req.query.subcategoria;
    if (typeof subcategoriaGet == "undefined") {
      subcategoriaGet = null;
      const result = await mostrarSubCategorias(categoriaGet, subcategoriaGet);
      res.status(200).json(result);
    } else {
      const result = await mostrarProductos(categoria, subcategoria);
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al mostrar los productos");
  }
}
