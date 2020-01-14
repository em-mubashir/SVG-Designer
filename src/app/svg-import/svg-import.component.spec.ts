import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgImportComponent } from './svg-import.component';

describe('SvgImportComponent', () => {
  let component: SvgImportComponent;
  let fixture: ComponentFixture<SvgImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
