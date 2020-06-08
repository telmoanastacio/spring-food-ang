import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMenuComponent } from './pre-menu.component';

describe('PreMenuComponent', () => {
  let component: PreMenuComponent;
  let fixture: ComponentFixture<PreMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
