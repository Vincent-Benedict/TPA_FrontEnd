import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGameComponentsComponent } from './search-game-components.component';

describe('SearchGameComponentsComponent', () => {
  let component: SearchGameComponentsComponent;
  let fixture: ComponentFixture<SearchGameComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGameComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGameComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
