import Usuario from "../models/Usuario";

const validacionEmailYaRegistrado = async (req, res, next) => {
    try {
        const {email} = req.body;
        const usuarioConEmail = await Usuario.findOne({
            where: {
                email: email
            }
        });
        if (usuarioConEmail) {
            return res.status(409).json({
                error: "Email ya registrado por un usuario."
            });
        }
        next();
    }catch (e) {
        return res.status(500).json({
            error: "Error en la verificacion de email ya registrado",
            message: e.message
        });
    }
}
export {
    validacionEmailYaRegistrado
}