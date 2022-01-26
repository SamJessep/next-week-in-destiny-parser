export default interface WeaponJSON {
  description: string;
  name: string;
  icon: string;
  screenshot: string;
  overlay_icon: string;
  perks: any;
  stats:Stat[]
}

interface Stat{
  name:string,
  description:string,
  value:number,
  max:number
  displayMap?:[]
}