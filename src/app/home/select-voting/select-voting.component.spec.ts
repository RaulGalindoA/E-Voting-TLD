import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVotingComponent } from './select-voting.component';

describe('SelectVotingComponent', () => {
  let component: SelectVotingComponent;
  let fixture: ComponentFixture<SelectVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectVotingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
