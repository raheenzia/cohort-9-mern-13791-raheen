import { registerUserService } from "../services/auth.service.js";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const result = await registerUserService({
            name,
            email,
            password,
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};