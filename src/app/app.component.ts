import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {ParameterFormComponent} from "./parameter-form/parameter-form.component";
import {ValueChartComponent} from "./value-chart/value-chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatDividerModule, MatToolbarModule, MatIconModule, MatGridListModule, ParameterFormComponent, ValueChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cost-calculator';
  background = 'lightblue';
}
