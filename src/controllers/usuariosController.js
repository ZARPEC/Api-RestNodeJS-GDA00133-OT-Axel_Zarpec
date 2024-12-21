import {LoginModel} from '../models/loginModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function Login(req, res) {
    try {
        const {nombreUsuario, pass} = req.body;
        const user = await LoginModel(nombreUsuario);
        if (user.length === 0) {
            return res.status(400).json({message: "Usuario no encontrado"});
        }
        const validPass = await bcrypt.compare(pass, user[0].password);
        if (!validPass) {
            return res.status(400).json({message: "Contraseña incorrecta"});
        }
        const token = jwt.sign({id: user[0].idUsuario}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
        console.log(token);
        res.status(200).json({message: "Usuario logueado", token: token});
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al loguear el usuario");
    }
}