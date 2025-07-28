"use client"
const FormularioRegistro = () => {
    return (
        <>
            <form className="my-14 space-y-5" noValidate>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold text-2xl">Email:</label>
                    <input type="email" id="email" className="w-full border border-gray-300 p-3 rounded-lg"
                           placeholder="Email de registro"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="nombre" className="font-bold text-2xl">Nombre:</label>
                    <input type="text" id="nombre" className="w-full border border-gray-300 p-3 rounded-lg"
                           placeholder="Nombre de registro"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-bold text-2xl">Passsword:</label>
                    <input type="password" id="password" className="w-full border border-gray-300 p-3 rounded-lg"
                           placeholder="Password de registro"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-2xl">Repetir Password</label>
                    <input id="password_confirmation" type="password" placeholder="Repite Password de Registro"
                           className="w-full border border-gray-300 p-3 rounded-lg"
                           name="password_confirmation"
                    />
                </div>

                <input type="submit" value="Registrarme"
                       className=" uppercase bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block transition-colors duration-500"/>
            </form>
        </>
    );
}
export default FormularioRegistro;