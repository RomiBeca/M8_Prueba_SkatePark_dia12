import pg from "pg";
import "dotenv/config";
const { Pool } = pg;

//
const connectionString = process.env.CONNECTION_DB;
export const db = new Pool({
  connectionString,
  allowExitOnIdle: true,
});
try {
  await db.query("SELECT NOW()");
  console.log("data base conectada");
} catch (error) {
  console.log(error);
}
