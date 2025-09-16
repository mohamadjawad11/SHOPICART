import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Set environment flag for production
const isProduction = process.env.NODE_ENV === 'production';

//Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Corrected cookie configuration
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            domain: isProduction ? '.vercel.app' : undefined,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await user.save();
        return res.json({ success: true, user: { email: user.email, name: user.name } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

// Login User
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect Fields' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        // Corrected cookie configuration
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            domain: isProduction ? '.vercel.app' : undefined,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, user: { email: user.email, name: user.name } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

export const isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(401).json({ success: false, message: "User not found" });
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const logoutUser = async (req, res) => {
    try {
        if (req.userId) {
            await User.findByIdAndUpdate(req.userId, { cartItems: {} });
        }

        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict'
        });

        return res.json({ success: true, message: 'Logged out and cart cleared' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}