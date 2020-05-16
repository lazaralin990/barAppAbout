import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartaComponent } from './view-carta.component';

describe('ViewCartaComponent', () => {
  let component: ViewCartaComponent;
  let fixture: ComponentFixture<ViewCartaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCartaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
