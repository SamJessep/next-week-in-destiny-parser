export interface MapDetails {
  displayProperties: DisplayPropertiesOrOriginalDisplayProperties;
  originalDisplayProperties: DisplayPropertiesOrOriginalDisplayProperties;
  releaseIcon: string;
  releaseTime: number;
  completionUnlockHash: number;
  activityLightLevel: number;
  destinationHash: number;
  placeHash: number;
  activityTypeHash: number;
  tier: number;
  pgcrImage: string;
  rewards?: null[] | null;
  modifiers?: null[] | null;
  isPlaylist: boolean;
  challenges?: null[] | null;
  optionalUnlockStrings?: null[] | null;
  inheritFromFreeRoam: boolean;
  suppressOtherRewards: boolean;
  playlistItems?: null[] | null;
  matchmaking: Matchmaking;
  isPvP: boolean;
  insertionPoints?: null[] | null;
  activityLocationMappings?: null[] | null;
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
}
export interface DisplayPropertiesOrOriginalDisplayProperties {
  description: string;
  name: string;
  icon: string;
  hasIcon: boolean;
}
export interface Matchmaking {
  isMatchmade: boolean;
  minParty: number;
  maxParty: number;
  maxPlayers: number;
  requiresGuardianOath: boolean;
}
