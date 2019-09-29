import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingRouteComponent } from './walking-route.component';

describe('WalkingRouteComponent', () => {
  let component: WalkingRouteComponent;
  let fixture: ComponentFixture<WalkingRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkingRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkingRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
