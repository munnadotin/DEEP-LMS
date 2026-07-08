import jwt from 'jsonwebtoken';

// Generate register link token
export const generateRegisterLinkToken = (id: string, ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
}

// Generate refresh token for 7 days
export const refreshTokenGenerator = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

// Generate access token for 15 minutes
export const accessTokenGenerator = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
}
