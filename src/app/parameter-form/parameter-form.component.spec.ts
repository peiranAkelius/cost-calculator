import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterFormComponent } from './parameter-form.component';

describe('ParameterFormComponent', () => {
  let component: ParameterFormComponent;
  let fixture: ComponentFixture<ParameterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParameterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
