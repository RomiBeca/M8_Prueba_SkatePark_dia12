import { handleError } from "../database/errors.js";
import {
  create,
  findAll,
  findOneByEmail,
  updateByEmail,
  removeByEmail,
} from "../models/skater.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registro y login
export const registerSkater = async (req, res) => {
  try {
    const { email, nombre, password, anios_experiencia, especialidad, foto } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSkater = await create({
      email,
      nombre,
      password: hashedPassword,
      anios_experiencia,
      especialidad,
      foto,
    });
    res.status(201).json({ message: `Se ha creado con exito:`, newSkater });
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};

export const loginSkater = async (req, res) => {
  try {
    const { email, password } = req.body;
    const skater = await findOneByEmail(email);
    if (!skater) {
      return res.status(404).json({ error: "El Skater no ha sido encontrado" });
    }

    const isValidPassword = await bcrypt.compare(password, skater.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ email: skater.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};

// CRUD Skater
export const getSkater = async (req, res) => {
  try {
    const skaters = await findAll();
    res.json(skaters);
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};

export const getOneSkater = async (req, res) => {
  try {
    const { email } = req.params;
    const skater = await findOneByEmail(email);
    if (!skater) {
      return res.status(404).json({ error: "Skater no encontrado" });
    }
    res.json(skater);
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};

export const putSkater = async (req, res) => {
  try {
    const { email } = req.params;
    const { nombre, password, anios_experiencia, especialidad, foto, estado } =
      req.body;

    const updateData = {
      nombre,
      anios_experiencia,
      especialidad,
      foto,
      estado,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedSkater = await updateByEmail(email, updateData);
    if (!updatedSkater) {
      return res.status(404).json({ error: "Skater no encontrado" });
    }
    res.json(updatedSkater);
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};

// Eliminar un skater por email
export const deleteSkater = async (req, res) => {
  try {
    const { email } = req.params;
    const deletedSkater = await removeByEmail(email);
    if (!deletedSkater) {
      return res.status(404).json({ error: "Skater no encontrado" });
    }
    res.json(deletedSkater);
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};

// Perfil
export const profile = async (req, res) => {
  try {
    const { email } = req.user;
    const skater = await findOneByEmail(email);
    if (!skater) {
      return res.status(404).json({ error: "El skater no ha sido encontrado" });
    }
    res.json(skater);
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};

// Admin
export const getAdmin = async (req, res) => {
  try {
    const skaters = await findAll();
    res.json(skaters);
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};
//actualizar Admin
export const putAdmin = async (req, res) => {
  try {
    const { email } = req.params;
    const { rol_id } = req.body;
    const updatedSkater = await updateByEmail(email, { rol_id });
    res.json(updatedSkater);
  } catch (error) {
    console.log(error);
    res.status(handleError(error).code).json(handleError(error));
  }
};
