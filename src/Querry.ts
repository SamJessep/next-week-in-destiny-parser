var fs = require("fs");
const path = require("path");

export const PLUG_DEFS = __dirname+"/data/DestinyPlugSetDefinition.json";
export const ITEM_DEFS = __dirname+"/data/DestinyInventoryItemDefinition.json";
export const SOCKET_DEFS = __dirname+"/data/DestinySocketTypeDefinition.json";

export const getItemByHash = (manifestType: string, hash: string) => {
  var data = fs.readFileSync(manifestType, { encoding: "utf8" });
  const json = JSON.parse(data);
  return json[hash];
};

const getPlugs = (plugHash: string) => {
  var data = fs.readFileSync(PLUG_DEFS);
  const json = JSON.parse(data);
  return json[plugHash].reusablePlugItems;
};

const getPlugPerks = (json: string, plugHash: string) => {
  const plugs = getPlugs(plugHash);
  let plugNames:string[] = []
  return plugs.map((plug: any) => {
    return {
      obtainable:plug.currentlyCanRoll,
      ...getPerk(json, plug.plugItemHash)?.displayProperties
    }
  }).filter((plug:{name:string})=>{
    if(plugNames.includes(plug.name)){
      return false
    }
    plugNames.push(plug.name)
    return true
  });
};

const getPerk = (json: any, perkHash: string) => {
  return json[perkHash];
};

const getSocketName = (json:any, singleInitialItemHash: string) => {
  if(json[singleInitialItemHash] === undefined) return ""
  return getPerk(json,singleInitialItemHash).itemTypeDisplayName
};

const isShitSocket = (socket: any, index: number) => {
  if (!socket.name) return true;
  if (index > 1) {
    if (!Array.isArray(socket.plugs)) return true;
  }
  if (socket.name.toLowerCase() == "shader") return true;
  return false;
};

export const getAllPerks = (weaponHash: string) => {
  var data = fs.readFileSync(ITEM_DEFS);
  const json = JSON.parse(data);
  const weapon = getItemByHash(ITEM_DEFS, weaponHash);
  const sockets = weapon.sockets.socketEntries;
  const cleanedSockets: any = [];
  sockets.forEach((socket: any, index: number) => {
    const isRandomSocket = "randomizedPlugSetHash" in socket;
    const name = getSocketName(json, socket.singleInitialItemHash);
    const plugs = isRandomSocket
      ? getPlugPerks(json, socket.randomizedPlugSetHash)
      : getPerk(json, socket.singleInitialItemHash)?.displayProperties;
    const newSocket = { name, plugs, random: isRandomSocket };
    if (!isShitSocket(newSocket, index)) cleanedSockets.push(newSocket);
  });

  return cleanedSockets;
};
