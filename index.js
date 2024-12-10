import sql from "mssql";
import dbConfig from "./dbConfig.mjs";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

app.get("/", async (req, res) => {
  const resultado = await conectar();
  res.json(resultado);
});

app.post("/AgregarCategoria", async (req, res) => {
  try {
    await sql.connect(dbConfig);
    var nombreCat = req.body.nombre;
    const result =
      await sql.query`insert into dbo.Categoria_producto (nombre_categoria) values (${nombreCat})`;
      res.status(200);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    console.log("Error al agregar la categoria");
    res.status(500);
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function conectar() {
  try {
    await sql.connect(dbConfig);
    const result =
      await sql.query`select * from dbo.Productos_top10MasVendidos`;
    return result.recordset;
  } catch (err) {
    console.log(err);
  } finally {
    sql.close();
  }
}
