import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOCRComponent } from './dialog-ocr.component';

describe('DialogOCRComponent', () => {
  let component: DialogOCRComponent;
  let fixture: ComponentFixture<DialogOCRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOCRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
