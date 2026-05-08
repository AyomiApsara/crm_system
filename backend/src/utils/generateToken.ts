import jwt from "jsonwebtoken";

const generateToken = (userId: number, role: string) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};

export default generateToken;