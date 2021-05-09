export enum IslamicSchools {
  Hanafi,
  Shafei,
  Hanbali,
  Maliki,
  Other
}

export interface Religion {
  school: IslamicSchools;
}
