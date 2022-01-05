import { MapDetails } from "./types/MapDetails";
import { MapJSON } from "./types/MapJSON";
import { MapSearch } from "./types/MapSearch";
import { WeaponDetails} from "./types/WeaponDetails";
import WeaponJSON from "./types/WeaponJSON";
import { WeaponSearch } from "./types/WeaponSearch";

const axios = require('axios').default;


const SEARCH_URL = 'https://www.bungie.net/Platform/Destiny2/Armory/Search/'
const DETAIL_URL = 'https://www.bungie.net/Platform/Destiny2/Manifest//'
export const MAP_DEF = 'DestinyActivityDefinition'
export const WEAPON_DEF = 'DestinyInventoryItemDefinition'
const AUTH_HEADERS = {"X-API-Key":"194905872e5246a6b74852cb158a9fb7"}


export const Search =  async (term:string, defType:string) : Promise<WeaponSearch|MapSearch> =>{
  const res = await axios.get(SEARCH_URL+defType+`/${term.replace(/[^a-zA-Z ]/g, "")}`,{headers:AUTH_HEADERS})
  return res.data.Response
}

export const Details = async <T> (hash:number, defType:string) :Promise<T> =>{
  const res = await axios.get(DETAIL_URL+defType+`/${hash}`,{headers:AUTH_HEADERS})
  return res.data.Response
}

export const CreateWeaponJSON = async (name:string):Promise<WeaponJSON> =>{
  const searchResults = (await Search(name, WEAPON_DEF)).results.results
  if(searchResults!= null){
    const weaponData = await Details<WeaponDetails>(searchResults[0].hash, WEAPON_DEF)
    return {
      name:weaponData.displayProperties.name,
      icon:weaponData.displayProperties.icon,
      overlay_icon:weaponData.iconWatermark,
      description:weaponData.displayProperties.description
    }
  }
  return {
    name:"",
    icon:"",
    overlay_icon:"",
    description:""
  }
}

export const CreateMapJSON = async (name:string):Promise<MapJSON> =>{
  const searchResults = (await Search(name, MAP_DEF)).results.results
  if(searchResults!= null){
    const mapData = await Details<MapDetails>(searchResults[0].hash, MAP_DEF)
    return {
      name:mapData.displayProperties.name,
      icon:mapData.displayProperties.icon,
      backdrop:mapData.pgcrImage,
      description:mapData.displayProperties.description
    }
  }
  return {
    name:"",
    icon:"",
    backdrop:"",
    description:""
  }
}


