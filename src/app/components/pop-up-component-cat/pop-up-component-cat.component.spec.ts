import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpComponentCatComponent } from './pop-up-component-cat.component';

describe('PopUpComponentCatComponent', () => {
  let component: PopUpComponentCatComponent;
  let fixture: ComponentFixture<PopUpComponentCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpComponentCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpComponentCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
