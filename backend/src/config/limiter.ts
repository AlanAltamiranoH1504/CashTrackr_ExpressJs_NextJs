import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    //Tiempo que se recuerdan la peticiones
    windowMs: 60 * 1000,
    //Numero maximo de peticiones en el tiempo definido
    limit: 5,
    message: {
        error: "Haz alcanzado el limite de peticiones"
    }
})

export {
    limiter
}