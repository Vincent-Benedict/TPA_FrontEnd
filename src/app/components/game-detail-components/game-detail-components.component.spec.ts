import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailComponentsComponent } from './game-detail-components.component';

describe('GameDetailComponentsComponent', () => {
  let component: GameDetailComponentsComponent;
  let fixture: ComponentFixture<GameDetailComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
