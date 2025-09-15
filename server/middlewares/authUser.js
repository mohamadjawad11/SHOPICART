import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Please login' });
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.userId = tokenDecoded.id;  // attach safely
      return next();
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authUser;
