import jwt from "jsonwebtoken";


export function verifyToken(req: Request) {
  try {
    
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch {
    return null;
  }
}
