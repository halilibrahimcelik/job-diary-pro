import jwt from 'jsonwebtoken';

interface IJwtPayload extends jwt.JwtPayload {
  userId: string;
  role?: string;
  [key: string]: any;
}
export const createJWT = (payload: IJwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;
  return decoded;
};
