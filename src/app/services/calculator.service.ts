import {Injectable} from '@angular/core';
import {CostParameter} from "../model/CostParameter";
import {CostResult} from "../model/CostResult";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() {}

  calculateCosts(costParams: CostParameter): CostResult {
    // basicCost
    const majorServices: number =
      this.calculateBasicCost(costParams.unitCount, costParams.pricePerUnitForMajorApp, costParams.timeFactor, costParams.majorApplicationCount);
    const coreServices: number =
      this.calculateBasicCost(costParams.unitCount, costParams.pricePerUnitForCoreApp, costParams.timeFactor, costParams.coreApplicationCount);
    const thirdPartyServices: number =
      this.calculateBasicCost(costParams.unitCount, 1, costParams.timeFactor, costParams.thirdPartyPricePerUnit);

    //discount
    const majorAppDiscount: number = this.calculateDiscountSum(costParams, true);
    const coreAppDiscount: number = this.calculateDiscountSum(costParams, false);

    const totalDiscount: number = this.calculateDiscount(costParams, majorServices + coreServices + thirdPartyServices);

    // extra

    // aggregatedCost
    const majorAppAggregatedCost: number = majorServices - majorAppDiscount;
    const coreAppAggregatedCost: number = coreServices - coreAppDiscount;
    const totalPrice: number = majorServices + coreServices + thirdPartyServices;
    const finalPriceUserBased: number = costParams.userCount * costParams.pricePerUser;

    return {
      totalPrice: totalPrice,
      totalDiscount: totalDiscount,
      finalPriceUnitBased: totalPrice - totalDiscount,
      finalPriceUserBased: finalPriceUserBased,
    };
  }

  // first strategy: discount with staggered prices
  calculateDiscountSum(costParams: CostParameter, isMajorApp: boolean): number {
    let discount: number = 0;
    let discountSum: number = 0;
    const maxCount: number = isMajorApp ? costParams.majorApplicationCount : costParams.coreApplicationCount;

    if (isMajorApp) {
      for (let i = 1; i < maxCount + 1; i++) {
        discount = costParams.discountMapForMajorApp.get(i) ?? discount;
        const majorAppDiscountedPrice: number = costParams.pricePerUnitForMajorApp * (discount / 100);
        const majorAppDiscountedCost: number =
          this.calculateBasicCost(costParams.unitCount, majorAppDiscountedPrice, costParams.timeFactor, 1);

        discountSum = discountSum + majorAppDiscountedCost;
      }
    } else {
      for (let i = 1; i < maxCount + 1; i++) {
        discount = costParams.discountMapForCoreApp.get(i) ?? discount;
        const coreAppDiscountedPrice: number = costParams.pricePerUnitForCoreApp * (discount / 100);
        const coreAppDiscountedCost: number =
          this.calculateBasicCost(costParams.unitCount, coreAppDiscountedPrice, costParams.timeFactor, 1);

        discountSum = discountSum + coreAppDiscountedCost;
      }
    }

    return discountSum;
  }

  // second strategy: discount on total price
  calculateDiscount(costParams: CostParameter, totalPrice: number): number {
    let discount: number = 0;
    let discountSum: number = 0;

    for (let i = 1; i < costParams.majorApplicationCount + 1; i++) {
      discount = costParams.discountMapForMajorApp.get(i) ?? discount;
      const majorAppDiscountedPrice: number = costParams.pricePerUnitForMajorApp * (discount / 100);
      discountSum = totalPrice * (discount / 100);
    }


    return discountSum;
  }

  calculateBasicCost(unitCount: number, unitPrice: number, timeFactor: number, appCount: number): number {
    // basicCost
    return unitCount * unitPrice * timeFactor * appCount;
  }
}
