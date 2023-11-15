import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueChartComponent } from './value-chart.component';

describe('ValueChartComponent', () => {
  let component: ValueChartComponent;
  let fixture: ComponentFixture<ValueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
