import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLoaderComponent } from './import-loader.component';

describe('ImportLoaderComponent', () => {
  let component: ImportLoaderComponent;
  let fixture: ComponentFixture<ImportLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
