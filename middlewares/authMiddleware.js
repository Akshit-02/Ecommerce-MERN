import JWT from "jsonwebtoken";
import userModel from "../models/usersModel.js"
//protected routes tekn base

export const requiredSignIn = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ success: false, message: "Authorization header is missing" });
        }

        const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ success: false, message: "Token is missing from Authorization header" });
        }

        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();

    } catch (error) {
        console.error("Error in requiredSignIn middleware:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired" });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized Access - Admin role required"
            });
        }

        next();

    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
};