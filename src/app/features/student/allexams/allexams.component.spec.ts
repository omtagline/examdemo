import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllexamsComponent } from './allexams.component';

describe('AllexamsComponent', () => {
  let component: AllexamsComponent;
  let fixture: ComponentFixture<AllexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllexamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
