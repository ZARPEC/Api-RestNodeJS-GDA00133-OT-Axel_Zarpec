import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";

export async function LoginModel(usuario) {
  try {
    await sql.connect(dbConfig);
    const result =
      await sql.query`SELECT * FROM usuarios WHERE email = ${usuario}`;
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}
