export interface WeaponDetails {
  displayProperties: DisplayProperties;
  tooltipNotifications?: (null)[] | null;
  collectibleHash: number;
  iconWatermark: string;
  iconWatermarkShelved: string;
  backgroundColor: BackgroundColor;
  screenshot: string;
  itemTypeDisplayName: string;
  flavorText: string;
  uiItemDisplayStyle: string;
  itemTypeAndTierDisplayName: string;
  displaySource: string;
  action: Action;
  inventory: Inventory;
  stats: Stats;
  equippingBlock: EquippingBlock;
  translationBlock: TranslationBlock;
  preview: Preview;
  quality: Quality;
  acquireRewardSiteHash: number;
  acquireUnlockHash: number;
  sockets: Sockets;
  talentGrid: TalentGrid;
  investmentStats?: (InvestmentStatsEntity)[] | null;
  perks?: (null)[] | null;
  loreHash: number;
  summaryItemHash: number;
  allowActions: boolean;
  doesPostmasterPullHaveSideEffects: boolean;
  nonTransferrable: boolean;
  itemCategoryHashes?: (number)[] | null;
  specialItemType: number;
  itemType: number;
  itemSubType: number;
  classType: number;
  breakerType: number;
  equippable: boolean;
  damageTypeHashes?: (number)[] | null;
  damageTypes?: (number)[] | null;
  defaultDamageType: number;
  defaultDamageTypeHash: number;
  isWrapper: boolean;
  traitIds?: (string)[] | null;
  traitHashes?: (number)[] | null;
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
}
export interface DisplayProperties {
  description: string;
  name: string;
  icon: string;
  hasIcon: boolean;
}
export interface BackgroundColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
export interface Action {
  verbName: string;
  verbDescription: string;
  isPositive: boolean;
  requiredCooldownSeconds: number;
  requiredItems?: (null)[] | null;
  progressionRewards?: (null)[] | null;
  actionTypeLabel: string;
  rewardSheetHash: number;
  rewardItemHash: number;
  rewardSiteHash: number;
  requiredCooldownHash: number;
  deleteOnAction: boolean;
  consumeEntireStack: boolean;
  useOnAcquire: boolean;
}
export interface Inventory {
  maxStackSize: number;
  bucketTypeHash: number;
  recoveryBucketTypeHash: number;
  tierTypeHash: number;
  isInstanceItem: boolean;
  nonTransferrableOriginal: boolean;
  tierTypeName: string;
  tierType: number;
  expirationTooltip: string;
  expiredInActivityMessage: string;
  expiredInOrbitMessage: string;
  suppressExpirationWhenObjectivesComplete: boolean;
}
export interface Stats {
  disablePrimaryStatDisplay: boolean;
  statGroupHash: number;
  hasDisplayableStats: boolean;
  primaryBaseStatHash: number;
}
export interface EquippingBlock {
  uniqueLabel: string;
  uniqueLabelHash: number;
  equipmentSlotTypeHash: number;
  attributes: number;
  equippingSoundHash: number;
  hornSoundHash: number;
  ammoType: number;
  displayStrings?: (string)[] | null;
}
export interface TranslationBlock {
  weaponPatternHash: number;
  defaultDyes?: (DefaultDyesEntity)[] | null;
  lockedDyes?: (null)[] | null;
  customDyes?: (null)[] | null;
  arrangements?: (ArrangementsEntity)[] | null;
  hasGeometry: boolean;
}
export interface DefaultDyesEntity {
  channelHash: number;
  dyeHash: number;
}
export interface ArrangementsEntity {
  classHash: number;
  artArrangementHash: number;
}
export interface Preview {
  screenStyle: string;
  previewVendorHash: number;
  previewActionString: string;
}
export interface Quality {
  itemLevels?: (null)[] | null;
  qualityLevel: number;
  infusionCategoryName: string;
  infusionCategoryHash: number;
  infusionCategoryHashes?: (number)[] | null;
  progressionLevelRequirementHash: number;
  currentVersion: number;
  versions?: (VersionsEntity)[] | null;
  displayVersionWatermarkIcons?: (string)[] | null;
}
export interface VersionsEntity {
  powerCapHash: number;
}
export interface Sockets {
  detail: string;
  socketEntries?: (SocketEntriesEntity)[] | null;
  intrinsicSockets?: (IntrinsicSocketsEntity)[] | null;
  socketCategories?: (SocketCategoriesEntity)[] | null;
}
export interface SocketEntriesEntity {
  socketTypeHash: number;
  singleInitialItemHash: number;
  reusablePlugItems?: (ReusablePlugItemsEntity | null)[] | null;
  preventInitializationOnVendorPurchase: boolean;
  preventInitializationWhenVersioning: boolean;
  hidePerksInItemTooltip: boolean;
  plugSources: number;
  reusablePlugSetHash?: number | null;
  overridesUiAppearance: boolean;
  defaultVisible: boolean;
  randomizedPlugSetHash?: number | null;
}
export interface ReusablePlugItemsEntity {
  plugItemHash: number;
}
export interface IntrinsicSocketsEntity {
  plugItemHash: number;
  socketTypeHash: number;
  defaultVisible: boolean;
}
export interface SocketCategoriesEntity {
  socketCategoryHash: number;
  socketIndexes?: (number)[] | null;
}
export interface TalentGrid {
  talentGridHash: number;
  itemDetailString: string;
  hudDamageType: number;
}
export interface InvestmentStatsEntity {
  statTypeHash: number;
  value: number;
  isConditionallyActive: boolean;
}
