import jwt from "jsonwebtoken";
const generateJWT = (email: string) => {
    return jwt.sign({
        email
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}
export {
    generateJWT
}