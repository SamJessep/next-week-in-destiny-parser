export interface ManifestResponse {
  Response: Response;
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: MessageData;
}
export interface Response {
  version: string;
  mobileAssetContentPath: string;
  mobileGearAssetDataBases?: MobileGearAssetDataBasesEntity[] | null;
  mobileWorldContentPaths: MobileWorldContentPathsOrJsonWorldContentPaths;
  jsonWorldContentPaths: MobileWorldContentPathsOrJsonWorldContentPaths;
  jsonWorldComponentContentPaths: JsonWorldComponentContentPaths;
  mobileClanBannerDatabasePath: string;
  mobileGearCDN: MobileGearCDN;
  iconImagePyramidInfo?: null[] | null;
}
export interface MobileGearAssetDataBasesEntity {
  version: number;
  path: string;
}
export interface MobileWorldContentPathsOrJsonWorldContentPaths {
  en: string;
  fr: string;
  es: string;
  esmx: string;
  de: string;
  it: string;
  ja: string;
  ptbr: string;
  ru: string;
  pl: string;
  ko: string;
  zhcht: string;
  zhchs: string;
}
export interface JsonWorldComponentContentPaths {
  en: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  fr: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  es: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  esmx: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  de: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  it: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  ja: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  ptbr: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  ru: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  pl: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  ko: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  zhcht: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
  zhchs: EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs;
}
export interface EnOrFrOrEsOrEsmxOrDeOrItOrJaOrPtbrOrRuOrPlOrKoOrZhchtOrZhchs {
  DestinyNodeStepSummaryDefinition: string;
  DestinyArtDyeChannelDefinition: string;
  DestinyArtDyeReferenceDefinition: string;
  DestinyPlaceDefinition: string;
  DestinyActivityDefinition: string;
  DestinyActivityTypeDefinition: string;
  DestinyClassDefinition: string;
  DestinyGenderDefinition: string;
  DestinyInventoryBucketDefinition: string;
  DestinyRaceDefinition: string;
  DestinyTalentGridDefinition: string;
  DestinyUnlockDefinition: string;
  DestinyMaterialRequirementSetDefinition: string;
  DestinySandboxPerkDefinition: string;
  DestinyStatGroupDefinition: string;
  DestinyProgressionMappingDefinition: string;
  DestinyFactionDefinition: string;
  DestinyVendorGroupDefinition: string;
  DestinyRewardSourceDefinition: string;
  DestinyUnlockValueDefinition: string;
  DestinyRewardMappingDefinition: string;
  DestinyRewardSheetDefinition: string;
  DestinyItemCategoryDefinition: string;
  DestinyDamageTypeDefinition: string;
  DestinyActivityModeDefinition: string;
  DestinyMedalTierDefinition: string;
  DestinyAchievementDefinition: string;
  DestinyActivityGraphDefinition: string;
  DestinyActivityInteractableDefinition: string;
  DestinyBondDefinition: string;
  DestinyCharacterCustomizationCategoryDefinition: string;
  DestinyCharacterCustomizationOptionDefinition: string;
  DestinyCollectibleDefinition: string;
  DestinyDestinationDefinition: string;
  DestinyEntitlementOfferDefinition: string;
  DestinyEquipmentSlotDefinition: string;
  DestinyStatDefinition: string;
  DestinyInventoryItemDefinition: string;
  DestinyInventoryItemLiteDefinition: string;
  DestinyItemTierTypeDefinition: string;
  DestinyLocationDefinition: string;
  DestinyLoreDefinition: string;
  DestinyMetricDefinition: string;
  DestinyObjectiveDefinition: string;
  DestinyPlatformBucketMappingDefinition: string;
  DestinyPlugSetDefinition: string;
  DestinyPowerCapDefinition: string;
  DestinyPresentationNodeDefinition: string;
  DestinyProgressionDefinition: string;
  DestinyProgressionLevelRequirementDefinition: string;
  DestinyRecordDefinition: string;
  DestinyRewardAdjusterPointerDefinition: string;
  DestinyRewardAdjusterProgressionMapDefinition: string;
  DestinyRewardItemListDefinition: string;
  DestinySackRewardItemListDefinition: string;
  DestinySandboxPatternDefinition: string;
  DestinySeasonDefinition: string;
  DestinySeasonPassDefinition: string;
  DestinySocketCategoryDefinition: string;
  DestinySocketTypeDefinition: string;
  DestinyTraitDefinition: string;
  DestinyTraitCategoryDefinition: string;
  DestinyUnlockCountMappingDefinition: string;
  DestinyUnlockEventDefinition: string;
  DestinyUnlockExpressionMappingDefinition: string;
  DestinyVendorDefinition: string;
  DestinyMilestoneDefinition: string;
  DestinyActivityModifierDefinition: string;
  DestinyReportReasonCategoryDefinition: string;
  DestinyArtifactDefinition: string;
  DestinyBreakerTypeDefinition: string;
  DestinyChecklistDefinition: string;
  DestinyEnergyTypeDefinition: string;
}
export interface MobileGearCDN {
  Geometry: string;
  Texture: string;
  PlateRegion: string;
  Gear: string;
  Shader: string;
}
export interface MessageData {}
