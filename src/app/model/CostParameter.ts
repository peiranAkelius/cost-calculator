export interface CostParameter {
  // properties
  unitCount: number;
  userCount: number;

  // applications
  majorApplicationCount: number;
  coreApplicationCount: number;

  // time
  timeFactor: number;

  // discount <threshold, discountPercent>
  discountMapForMajorApp: Map<number, number>;
  discountMapForCoreApp: Map<number, number>;

  // price
  singleSetUpFee: number;
  pricePerUnitForMajorApp: number;
  pricePerUnitForCoreApp: number;
  thirdPartyPricePerUnit: number;
  pricePerUser: number;
}
