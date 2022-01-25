import { MapDetails } from "./types/MapDetails";
import { MapJSON } from "./types/MapJSON";
import { MapSearch } from "./types/MapSearch";
import { WeaponDetails } from "./types/WeaponDetails";
import WeaponJSON from "./types/WeaponJSON";
import { WeaponSearch } from "./types/WeaponSearch";
import { getAllPerks, getItemByHash } from "./Querry";
import { queryDB } from "./DB";
const axios = require("axios").default;
require("dotenv").config();

const SEARCH_URL = "https://www.bungie.net/Platform/Destiny2/Armory/Search/";
const DETAIL_URL = "https://www.bungie.net/Platform/Destiny2/Manifest//";
export const MAP_DEF = "DestinyActivityDefinition";
export const WEAPON_DEF = "DestinyInventoryItemDefinition";
const AUTH_HEADERS = { "X-API-Key": process.env.BUNGIE_API_KEY };

export const Search = async (
  term: string,
  defType: string
): Promise<WeaponSearch | MapSearch> => {
  const url = new URL(
    SEARCH_URL + defType + `/${term.replace(/[^a-zA-Z \-']/g, "")}`
  ).href;
  const res = await axios.get(url, { headers: AUTH_HEADERS });
  return res.data.Response;
};

export const SearchManifest = async (
  db: any,
  term: string,
  defType: string
): Promise<any> => {
  const query = `select json_extract(json, "$.displayProperties.name") as item_name, json from ${defType} where item_name like "${term}"`;
  return (await queryDB(db, query)).map((row: { name: string; json: string }) =>
    JSON.parse(row.json)
  );
};

export const Details = async <T>(hash: number, defType: string): Promise<T> => {
  return getItemByHash(__dirname+"/data/" + defType + ".json", hash.toString());
};

export const CreateWeaponJSON = async (
  db: any,
  name: string
): Promise<WeaponJSON | undefined> => {
  const searchResults = (await SearchManifest(db, name, WEAPON_DEF)).sort(
    (a: { index: Number }, b: { index: Number }) => (a.index > b.index ? -1 : 1)
  );
  if (searchResults != null) {
    const weaponData = await Details<WeaponDetails>(
      searchResults[0].hash,
      WEAPON_DEF
    );
    return {
      name: weaponData.displayProperties.name,
      icon: weaponData.displayProperties.icon,
      screenshot: weaponData.screenshot,
      overlay_icon: weaponData.iconWatermark,
      description: weaponData.displayProperties.description,
      perks: getAllPerks(weaponData.hash.toString()),
    };
  }
};

export const CreateMapJSON = async (
  db: any,
  name: string
): Promise<MapJSON | undefined> => {
  if (name.toUpperCase() === "IB") {
    return {
      name: "Iron Banner",
      icon: "/common/destiny2_content/icons/0ee91b79ba1366243832cf810afc3b75.jpg",
      description:
        '"Bring the full force of your Light. Nothing less will do." —Lord Saladin \n\nAll-out team warfare. Destroy the enemy.',
      backdrop: "/img/destiny_content/pgcr/conceptual_iron_banner.jpg",
    };
  }
  const searchResults = (await SearchManifest(db, name, MAP_DEF)).sort(
    (a: {}, b: {}) => (a.toString().length > b.toString().length ? -1 : 1)
  );
  if (searchResults != null) {
    const mapData = await Details<MapDetails>(searchResults[0].hash, MAP_DEF);
    return {
      name: mapData.displayProperties.name,
      icon: mapData.displayProperties.icon,
      backdrop: mapData.pgcrImage,
      description: mapData.displayProperties.description,
    };
  }
};
