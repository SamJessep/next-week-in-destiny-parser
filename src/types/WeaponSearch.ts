export interface WeaponSearch {
  suggestedWords?: string[] | null;
  results: Results;
}
export interface Results {
  results?: ResultsEntity[] | null;
  totalResults: number;
  hasMore: boolean;
  query: Query;
  useTotalResults: boolean;
}
export interface ResultsEntity {
  hash: number;
  entityType: string;
  displayProperties: DisplayProperties;
  weight: number;
}
export interface DisplayProperties {
  description: string;
  name: string;
  icon: string;
  hasIcon: boolean;
}
export interface Query {
  itemsPerPage: number;
  currentPage: number;
}
