import {CostParameter} from "./CostParameter";
import {CostResult} from "./CostResult";

export interface CostHistory {
  costParameter: CostParameter;
  costResult: CostResult;
  discountPercent: number;
}
