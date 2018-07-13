import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCreateComponent } from './instrument-create.component';

describe('InstrumentCreateComponent', () => {
  let component: InstrumentCreateComponent;
  let fixture: ComponentFixture<InstrumentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
