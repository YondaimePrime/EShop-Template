import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMidComponent } from './nav-mid.component';

describe('NavMidComponent', () => {
  let component: NavMidComponent;
  let fixture: ComponentFixture<NavMidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
