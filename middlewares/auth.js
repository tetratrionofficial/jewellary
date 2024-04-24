import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  if (!token) {
    res.status(403).json({
      status: 1,
      message: 'Unauthorized',
    });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      res.json({
        status: 1,
        message: 'Invalid token',
      });
    }
    req.user = verifyToken;
    console.log(req.user);
    next();
  } catch (err) {
    res.json({
      status: 1,
      message: 'Invalid token',
    });
  }
};
