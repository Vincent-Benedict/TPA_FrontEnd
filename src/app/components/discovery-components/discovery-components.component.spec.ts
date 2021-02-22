import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryComponentsComponent } from './discovery-components.component';

describe('DiscoveryComponentsComponent', () => {
  let component: DiscoveryComponentsComponent;
  let fixture: ComponentFixture<DiscoveryComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveryComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
