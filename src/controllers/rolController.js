import {AgregarRolModel,mostrarRolesModel,modificarRolModel} from '../models/rolModel.js';


export async function agregarRol(req,res){
    const rol = req.body.nombre_rol;
    try {
        await AgregarRolModel(rol);
        res.status(200).json({message:"Rol agregado correctamente"});
    } catch (error) {
        res.status(500).json({message:"Error al agregar el rol"});
    }
}

export async function mostrarRoles(req,res){
    try {
        const result = await mostrarRolesModel();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"Error al mostrar los roles"});
        console.log(error);
    }
}

export async function modificarRol(req,res){
    const id = req.body.idRol;
    const rol = req.body.nuevoRol;

    try{
        const result = await modificarRolModel(id,rol);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:"Error al modificar el rol"});
    }

}

