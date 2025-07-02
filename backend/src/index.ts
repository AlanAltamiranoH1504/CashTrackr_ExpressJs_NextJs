import server from "./server";
import dotenv from "dotenv";
dotenv.config();

server.listen(process.env.PORT || 3000, () => {
    console.log(`Aplicacion corriendo en el puerto: ${process.env.PORT}`);
});