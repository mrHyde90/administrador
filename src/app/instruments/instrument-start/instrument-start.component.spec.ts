import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentStartComponent } from './instrument-start.component';

describe('InstrumentStartComponent', () => {
  let component: InstrumentStartComponent;
  let fixture: ComponentFixture<InstrumentStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
