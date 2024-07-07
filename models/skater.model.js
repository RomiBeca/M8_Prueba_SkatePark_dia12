import { db } from "../database/connection.js";

export const findAll = async () => {
  const { rows } = await db.query(`SELECT * FROM skaters`);
  return rows;
};

export const findOneByEmail = async (email) => {
  const query = {
    text: `SELECT * FROM skaters WHERE email = $1`,
    values: [email],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const create = async ({
  email,
  nombre,
  password,
  anios_experiencia,
  especialidad,
  foto,
  estado,
}) => {
  const query = {
    text: `
        INSERT INTO skaters (email, nombre, password, anios_experiencia, especialidad, foto, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `,
    values: [
      email,
      nombre,
      password,
      anios_experiencia,
      especialidad,
      foto,
      estado,
    ],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const updateByEmail = async (
  email,
  { nombre, password, anios_experiencia, especialidad, foto, estado }
) => {
  const query = {
    text: `
      UPDATE skaters
      SET nombre = $2, password = $3, anios_experiencia = $4, especialidad = $5, foto = $6, estado = $7
      WHERE email = $1
      RETURNING *
    `,
    values: [
      email,
      nombre,
      password,
      anios_experiencia,
      especialidad,
      foto,
      estado,
    ],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const removeByEmail = async (email) => {
  const query = {
    text: `
      DELETE FROM skaters
      WHERE email = $1
      RETURNING *
    `,
    values: [email],
  };
  const { rows } = await db.query(query);
  return rows[0];
};
