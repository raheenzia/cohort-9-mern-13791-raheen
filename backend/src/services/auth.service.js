import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUserService = async ({ name, email, password }) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("User with this email already exists");
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });
    
    try {
        await user.save();
    } catch (error) {
        if (error.code === 11000) {
            const duplicateError = new Error("Email already registered");
            duplicateError.statusCode = 400;
            throw duplicateError;
        }

        throw error;
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "8d"}
    );

    return{
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};