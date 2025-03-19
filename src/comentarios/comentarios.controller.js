import Comentario from './comentarios.model.js';
import Publicacion from '../publicaciones/publicaciones.model.js';

export const crearComentario = async (req, res) => {
    try {
        const { contenido, publicacion } = req.body;
        const userId = req.user.id;

        const nuevaPublicacion = await Publicacion.findById(publicacion);
        if (!nuevaPublicacion) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        const nuevoComentario = new Comentario({
            contenido,
            publicacion,
            user: userId
        });

        await nuevoComentario.save();
        return res.status(201).json({
            message: 'Comentario creado exitosamente',
            comentario: nuevoComentario
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear el comentario',
            error: error.message
        });
    }
};

export const obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find().populate('publicacion', 'titulo').populate('user', 'nombre');
        return res.status(200).json({ comentarios });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los comentarios',
            error: error.message
        });
    }
};

export const obtenerComentariosPorPublicacion = async (req, res) => {
    try {
        const { publicacionId } = req.params;

        const comentarios = await Comentario.find({ publicacion: publicacionId }).populate('user', 'nombre');
        if (!comentarios.length) {
            return res.status(404).json({ message: 'No se encontraron comentarios para esta publicación' });
        }

        return res.status(200).json({ comentarios });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los comentarios',
            error: error.message
        });
    }
};

export const editarComentario = async (req, res) => {
    try {
        const { id } = req.params; 
        const { contenido } = req.body; 

        
        const comentario = await Comentario.findById(id);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

    
        comentario.contenido = contenido;
        await comentario.save();

        res.status(200).json({ message: 'Comentario actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar el comentario', error: error.message });
    }
};


export const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comentario.findByIdAndDelete(id);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
};