import { TestBed } from '@angular/core/testing';

import { DogsRouteService } from './dogs-route.service';

describe('DogsRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DogsRouteService = TestBed.get(DogsRouteService);
    expect(service).toBeTruthy();
  });
});
