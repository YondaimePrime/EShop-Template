import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecificParamsComponent } from './product-specific-params.component';

describe('ProductSpecificParamsComponent', () => {
  let component: ProductSpecificParamsComponent;
  let fixture: ComponentFixture<ProductSpecificParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSpecificParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSpecificParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
