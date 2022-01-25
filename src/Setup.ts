import { createWriteStream } from "fs";
const path = require("path");
const fs = require("fs");
const download = require("download");
const unzipper = require("unzipper");
require("dotenv").config();

const axios = require("axios").default;
const MANIFEST_URL = "https://www.bungie.net/Platform/Destiny2/Manifest/";
const BUNGIE_URL = "https://www.bungie.net/";
const AUTH_HEADERS = { "X-API-Key": process.env.BUNGIE_API_KEY };
const SAVE_DIR = __dirname+"/data/"

export default async () => {
  const res = await axios.get(MANIFEST_URL, { headers: AUTH_HEADERS });
  await downloadAndUnzipManifest(res.data.Response.mobileWorldContentPaths.en);
  const enJSONFiles = res.data.Response.jsonWorldComponentContentPaths.en;
  for (let key of Object.keys(enJSONFiles)) {
    const manifestRes = await axios.get(BUNGIE_URL + enJSONFiles[key], {
      headers: AUTH_HEADERS,
    });
    await fs.promises.writeFile(
      SAVE_DIR + key + ".json",
      JSON.stringify(manifestRes.data),
      { flag: "w" }
    );
  }
};

const downloadAndUnzipManifest = async (url: string) => {
  const MANIFEST_URL = BUNGIE_URL + url;
  const manifestFileOutput = `${__dirname}/data/manifest.content`;
  await download(MANIFEST_URL)
    .pipe(unzipper.ParseOne())
    .pipe(createWriteStream(manifestFileOutput));
};
