import {
  CreateMapJSON,
  CreateWeaponJSON,
} from "./Search";
import Setup from "./Setup";
import ironBannerWeaponNames from "./ironBannerWeapons";
import { closeDB, openDB } from "./DB";
const path = require("path");

require("dotenv").config();

const raidChallengeMap: any = {
  "Vision of Confluence (Timelost)": 0,
  "Praedyth's Revenge (Timelost)": 1,
  "Fatebringer (Timelost)": 2,
  "Hezen Vengeance (Timelost)": 3,
  "Corrective Measure (Timelost)": 4,
};

const MakeGun = async (db: any, name: string) => {
  return CreateWeaponJSON(db, name);
};

const MakeMap = async (db: any, name: string) => {
  return CreateMapJSON(db, name);
};

const MakeWeek = async (
  db: any,
  week: string,
  keyRow: any,
  weeks: string[]
) => {
  const items: any = week.split(",").map((i: string) => i.trim()); //SPLIT COLUMNS
  if (items.length > 2) {
    for (let index of Object.keys(items)) {
      const key = keyRow[index].toUpperCase();
      if (["N/A", "?", "IB"].includes(items[index])) continue;
      if (key.includes("GUN")) items[index] = await MakeGun(db, items[index]);
      if (key.includes("MAP")) items[index] = await MakeMap(db, items[index]);
    }
    const [DATE, GM_MAP, GM_GUN_1, GM_GUN_2, RAID_GUN, TRIALS_GUN, TRIALS_MAP] =
      items;

    const trialsData = TRIALS_GUN.name
      ? {
          name: "Trials of osiris",
          items: [TRIALS_GUN],
          map: TRIALS_MAP,
        }
      : null;

    const ironBannerData = TRIALS_GUN.name
      ? null
      : {
          name: "Iron Banner",
        };

    return {
      date: DATE,
      vendors: {
        ironBanner: ironBannerData,
        trials: trialsData,
        raid: {
          name: "Vault of glass",
          challengeIndex: raidChallengeMap[RAID_GUN.name],
          items: [RAID_GUN],
        },
        grandmaster: {
          name: "Grandmaster Nightfall",
          items: [GM_GUN_1, GM_GUN_2],
          map: GM_MAP,
        },
      },
    };
  }
};

export const run = async (exportPath:string, fileName:string="appData.json") => {
  //Get latest manifest data
  await Setup();
  var fs = require("fs");
  // READ CSV INTO STRING
  var data = fs.readFileSync(path.resolve(__dirname,"../weeklydata.csv")).toLocaleString();

  //Open DB
  const db = await openDB();

  // STRING TO ARRAY
  var weekJSON: any = [];
  var weeks = data.split("\n").filter((_: any, index: number) => index != 0); // SPLIT ROWS
  const keyRow = data.split("\n")[0].split(",");
  for (let week of weeks) {
    const json = await MakeWeek(db, week, keyRow, weeks);
    weekJSON.push(json);
  }

  const ironBannerItems = [];
  for (let weaponName of ironBannerWeaponNames) {
    ironBannerItems.push(await MakeGun(db, weaponName.toLowerCase()));
  }

  const fileJSON = {
    weeks: weekJSON.filter((w: any) => w != null),
    ironBannerItems: ironBannerItems,
  };
  fs.writeFileSync(path.join(exportPath,fileName), JSON.stringify(fileJSON));

  //Clean up
  await closeDB(db);
};

function printProgress(progress: number) {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(Math.floor(progress * 100) + "%");
}
