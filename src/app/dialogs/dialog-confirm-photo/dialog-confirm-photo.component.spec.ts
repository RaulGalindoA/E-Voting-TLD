import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmPhotoComponent } from './dialog-confirm-photo.component';

describe('DialogConfirmPhotoComponent', () => {
  let component: DialogConfirmPhotoComponent;
  let fixture: ComponentFixture<DialogConfirmPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
