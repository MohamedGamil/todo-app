import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTodosComponent } from './public-todos.component';

describe('PublicTodosComponent', () => {
  let component: PublicTodosComponent;
  let fixture: ComponentFixture<PublicTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
