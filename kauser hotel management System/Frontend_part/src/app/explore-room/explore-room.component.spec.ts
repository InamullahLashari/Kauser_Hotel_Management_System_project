import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreRoomComponent } from './explore-room.component';

describe('ExploreRoomComponent', () => {
  let component: ExploreRoomComponent;
  let fixture: ComponentFixture<ExploreRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
