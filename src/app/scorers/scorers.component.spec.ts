import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorersComponent } from './scorers.component';

describe('ScorersComponent', () => {
  let component: ScorersComponent;
  let fixture: ComponentFixture<ScorersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
