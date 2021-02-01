import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGamePageComponent } from './search-game-page.component';

describe('SearchGamePageComponent', () => {
  let component: SearchGamePageComponent;
  let fixture: ComponentFixture<SearchGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
