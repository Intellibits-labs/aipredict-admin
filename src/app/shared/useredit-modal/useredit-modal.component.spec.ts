import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsereditModalComponent } from './useredit-modal.component';

describe('UsereditModalComponent', () => {
  let component: UsereditModalComponent;
  let fixture: ComponentFixture<UsereditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsereditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsereditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
