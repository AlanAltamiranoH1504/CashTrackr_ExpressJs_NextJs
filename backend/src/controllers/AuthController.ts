import Usuario from "../models/Usuario";

const prueba = (req, res) => {
    return res.status(200).json({
        msg: "Funciondo AuthController"
    });
}

const confirmacionCuenta = async (req, res) => {
    const token: string = req.params.token;
    const {tokenRequest} = req.body;
    try {
        //Busqueda de usuario con ese token
        const userToConfirmed = await Usuario.findOne({
            where: {
                token: tokenRequest
            }
        });
        if (!userToConfirmed) {
            return res.status(404).json({
                error: "Usuario para confirmacion no encontrado"
            });
        }
        //Confirmacion de usaurio
        userToConfirmed.confirmado = true;
        userToConfirmed.token = null;
        await userToConfirmed.save();
        return res.status(200).json({
            success: "Cuenta confirmada correctamente"
        });
    }catch (e) {
        return res.status(500).json({
            error: "Error en la confirmacion de cuenta de usuario",
            message: e.message
        });
    }
}

export {
    prueba,
    confirmacionCuenta
}