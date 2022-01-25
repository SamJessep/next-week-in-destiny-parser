const Database = require("sqlite-async");
const path = require("path");

const DB_PATH = path.resolve(__dirname, "data/manifest.content");

export const openDB = async () => {
  try {
    return await Database.open(DB_PATH);
  } catch (e) {
    console.error(e);
  }
};

export const closeDB = async (db: any) => {
  await db.close();
};

export const queryDB = async (db: any, query: any) => {
  return db.all(query, []);
};
