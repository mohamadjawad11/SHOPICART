import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({ success: false, message: 'Not authorized: No token' });
    }
    


    try {
        const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        if (tokenDecoded.email === process.env.SELLER_EMAIL) {
            return next();
        } else {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authSeller;
