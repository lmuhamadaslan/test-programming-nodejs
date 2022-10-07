import UserSchema from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../index.js";

export const register = async (req, res) => {
  const { name, password } = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  try {
    const user = await UserSchema.create({
      name,
      password: hashedPassword,
    });
    logger.debug("User created successfully");
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UserSchema.findOne({
      where: {
        name,
      },
    });
    if (!user) {
      logger.error("User not found");
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      logger.error("Invalid password");
      res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user.user_id }, "secret", {
      expiresIn: 86400,
    });
    logger.debug("User logged in successfully");
    res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.findAll();
    logger.debug("Users retrieved successfully");
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
