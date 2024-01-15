import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalculatorService} from "../services/calculator.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {CostParameter} from "../model/CostParameter";
import {MatCardModule} from "@angular/material/card";
import {CostResult} from "../model/CostResult";
import {resolve} from "node:path";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CostHistory} from "../model/CostHistory";
import {MatDividerModule} from "@angular/material/divider";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-parameter-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatExpansionModule, MatTableModule, MatSortModule, MatDividerModule],
  templateUrl: './parameter-form.component.html',
  styleUrl: './parameter-form.component.css'
})
export class ParameterFormComponent {

    // two forms
    costForm: FormGroup = this.formBuilder.group({
      unitCount: 2000,
      userCount: 5,
      majorAppCount: 3,
      coreAppCount: 0,
      timeFactor: 1,
      singleSetUpFee: 0,

      pricePerUnitForMajorApp: 1,
      pricePerUnitForCoreApp: 0.2,
      thirdPartyPricePerUnit: 0.3,
      pricePerUser: 50,
    });
    discountForm: FormGroup = this.formBuilder.group({
      discountThreshold: '',
      discountPercent: ''
    });

    // discount rules
    discountMapForMajorApp: Map<number, number> = new Map<number, number>();
    discountMapForCoreApp: Map<number, number> = new Map<number, number>();

    // result
    totalPrice: number = 0;
    discount: number = 0;
    finalPriceUnitBased: number = 0;
    finalPriceUserBased: number = 0;
    finalPrice: number = 0;
    panelOpenState = false;
    discountRules: string[] = [];
    history: CostHistory[] = [];
    dataSource: MatTableDataSource<CostHistory> = new MatTableDataSource(this.history);

    // table
    displayedColumns: string[] = ['unitNumber', 'majorAppNumber', 'coreAppNumber',
      'majorUnitPrice', 'coreUnitPrice', 'externalServicePricePerUnit', 'discountPercent', 'totalPrice'];
    displayedColumnsForUserBasedTable: string[] = ['userNumber', 'userPrice', 'userDiscountPercent', 'finalPriceUserBased'];

    constructor(
      private calculatorService: CalculatorService,
      private formBuilder: FormBuilder
    ) { }


  onSubmit(): void {

      // set the parameters
      let costParams: CostParameter = {
        singleSetUpFee: this.costForm.value.singleSetUpFee,
        unitCount: this.costForm.value.unitCount,
        userCount: this.costForm.value.userCount,
        majorApplicationCount: this.costForm.value.majorAppCount,
        coreApplicationCount: this.costForm.value.coreAppCount,
        timeFactor: this.costForm.value.timeFactor,
        discountMapForMajorApp: this.discountMapForMajorApp,
        discountMapForCoreApp: this.discountMapForCoreApp,
        pricePerUnitForMajorApp: this.costForm.value.pricePerUnitForMajorApp,
        pricePerUnitForCoreApp: this.costForm.value.pricePerUnitForCoreApp,
        thirdPartyPricePerUnit: this.costForm.value.thirdPartyPricePerUnit,
        pricePerUser: this.costForm.value.pricePerUser
      };

      // get the result
      const costResult: CostResult = this.calculatorService.calculateCosts(costParams);
      this.totalPrice = costResult.totalPrice;
      this.discount = costResult.totalDiscount;
      this.finalPriceUnitBased = costResult.finalPriceUnitBased;
      this.finalPriceUserBased = costResult.finalPriceUserBased;
      this.finalPrice = this.finalPriceUserBased + this.finalPriceUnitBased + this.costForm.value.singleSetUpFee;

      // insert into the history
      this.history.push({
        costParameter: costParams,
        costResult: costResult,
        discountPercent: costResult.totalDiscount/costResult.totalPrice * 100
      });

      this.history = [...this.history];
    }

    onMajorAppDiscountRuleAdd(): void {
      this.discountMapForMajorApp.set(this.discountForm.value.discountThreshold, this.discountForm.value.discountPercent);
      this.discountRules.push('after ' + this.discountForm.value.discountThreshold + ' major apps, discount is ' + this.discountForm.value.discountPercent + '%');
   }
}
