import jwt from 'jsonwebtoken';

const generateRegisterLinkToken = (id: string, ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
}
export default generateRegisterLinkToken;

