import jwt from "jsonwebtoken";
import User from "../users/user.model.js";
 
 
export const validarJWT = async (req, res, next) => {
 
    const token = req.header("x-token");
 
    if(!token){
        return res.status(401).json({
            success: false,
            msg: "No hay token en la petición"
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: 'Usuario no existe en la base de datos'
            });
        }

        if (!user.estado) {
            return res.status(401).json({
                success: false,
                msg: 'Token no válido - Usuario con estado inactivo'
            });
        }

        req.user = {
            id: user._id.toString(),
            nombre: user.nombre,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        console.log("Error en validarJWT:", error);
        res.status(401).json({
            success: false,
            msg: "Token no válido"
        });
    }
};
