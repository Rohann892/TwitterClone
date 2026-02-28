import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        req.userId = decoded.userId;

        console.log(decoded.userId);

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Invalid token',
            success: false,
        });
    }
};

export default isAuthenticated;