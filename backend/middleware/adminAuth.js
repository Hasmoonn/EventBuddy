import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    // Verify the admin token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if it's an admin token (contains role: 'admin')
    if (token_decode.role !== 'admin') {
      return res.json({ success: false, message: 'Not Authorized. Invalid Token' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
