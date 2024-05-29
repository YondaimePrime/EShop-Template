import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralParamsComponent } from './general-params.component';

describe('GeneralParamsComponent', () => {
  let component: GeneralParamsComponent;
  let fixture: ComponentFixture<GeneralParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
