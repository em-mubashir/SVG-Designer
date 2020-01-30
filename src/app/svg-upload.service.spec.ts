import { TestBed } from '@angular/core/testing';

import { SvgUploadService } from './svg-upload.service';

describe('SvgUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgUploadService = TestBed.get(SvgUploadService);
    expect(service).toBeTruthy();
  });
});
