var fs = require("fs");
const path = require("path");

export const PLUG_DEFS = __dirname+"/data/DestinyPlugSetDefinition.json";
export const ITEM_DEFS = __dirname+"/data/DestinyInventoryItemDefinition.json";
export const SOCKET_DEFS = __dirname+"/data/DestinySocketTypeDefinition.json";
export const STAT_DEFS = __dirname+"/data/DestinyStatDefinition.json";
export const STAT_GROUP_DEFS = __dirname+"/data/DestinyStatGroupDefinition.json";

const parseDefs = (defPath:string)=>{
  var data = fs.readFileSync(defPath);
  return JSON.parse(data);
}

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
    const perk = getPerk(json, plug.plugItemHash)
    return {
      obtainable:plug.currentlyCanRoll,
      ...perk?.displayProperties,
      perkBonuses:getPerkStatBonuses(perk)
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

const getPerkStatBonuses = (perk:any)=>{
  let bonuses:any = {}
  let statDefs = parseDefs(STAT_DEFS)
  perk.investmentStats.forEach((bonus:{statTypeHash:number, value:number, isConditionallyActive:boolean})=>{
    const stat = statDefs[bonus.statTypeHash]
    if(!stat) return
    bonuses[stat.displayProperties.name] = {value:bonus.value,isConditionallyActive:bonus.isConditionallyActive}
  })
  return bonuses
}

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
  const json = parseDefs(ITEM_DEFS)
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


export const getAllStats = (weaponHash: string)=>{
  const statsJSON = parseDefs(STAT_DEFS);
  const weapon = getItemByHash(ITEM_DEFS, weaponHash);

  const statGroup = parseDefs(STAT_GROUP_DEFS)[weapon.stats.statGroupHash]
  let stats:any = {}
  statGroup.scaledStats.forEach((stat:any)=>{
    try{
      const {value} = weapon.stats.stats[stat.statHash]
      const {description, name} = statsJSON[stat.statHash].displayProperties
      const {weight:min}= stat.displayInterpolation[0]
      const {weight:max}= stat.displayInterpolation[stat.displayInterpolation.length-1]
      stats[name] = {
        name,
        description,
        value,
        max,
        min
      }
    }catch(e){console.error(e)}
  })

  for(let statKey in weapon.stats.stats){
    if(statKey in stats) continue

    const {value,displayMaximum} = weapon.stats.stats[statKey]
    const {description, name} = statsJSON[statKey].displayProperties
    if(name == "")continue
    stats[name] = {
      name,
      description,
      value,
      max:displayMaximum,
      min:0
    }
  }
  return stats
}
