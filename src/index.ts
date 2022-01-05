import { CreateMapJSON, CreateWeaponJSON } from "./Search"

const raidChallengeMap:any = {
  "Vision of Confluence (Timelost)": 0,
  "Praedyth's Revenge (Timelost)": 1,
  "Fatebringer (Timelost)": 2,
  "Hezen Vengeance (Timelost)":3,
  "Corrective Measure (Timelost)":4
}

const MakeGun = async (name:string)=>{
  return CreateWeaponJSON(name)
}

const MakeMap = async (name:string)=>{
  return CreateMapJSON(name)
}


const run = async()=>{
  var fs = require("fs");
  // READ CSV INTO STRING
  var data = fs.readFileSync("weeklydata.csv").toLocaleString();
  
  // STRING TO ARRAY
  var weekJSON:any = []
  var weeks = data.split("\n").filter((_:any,index:number)=>index!=0); // SPLIT ROWS
  const keyRow=data.split("\n")[0].split(",")
  for(let week of weeks) {
      const items:any = week.split(",").map(i=>i.trim()); //SPLIT COLUMNS
      if(items.length>2){
        for(let index of Object.keys(items)){
          const key = keyRow[index].toUpperCase()
          if(key.includes("GUN")) items[index] = await MakeGun(items[index])
          if(key.includes("MAP") && items[index] != "N/A" && items[index] != "?") items[index] = await MakeMap(items[index])
  
          await new Promise(resolve => setTimeout(resolve, 500));
    
        }
        const [DATE, GM_MAP, GM_GUN_1, GM_GUN_2, RAID_GUN, TRIALS_GUN, TRIALS_MAP] = items
        
  
  
  
  
        weekJSON.push({
          date:DATE,
          vendors:{
            trials:{
              name:"Trials of osiris",
              items:[
                TRIALS_GUN
              ],
              map:TRIALS_MAP
            },
            raid:{
              name:"Vault of glass",
              challengeIndex:raidChallengeMap[RAID_GUN.name],
              items:[
                RAID_GUN
              ]
            },
            gm:{
              name:"Grandmaster Nightfall",
              items:[
                GM_GUN_1,
                GM_GUN_2
              ],
              map:GM_MAP
            }
          }
        })
      }
  }
  
  fs.writeFileSync(".weeklyItems.json", JSON.stringify(weekJSON))
}

run()
