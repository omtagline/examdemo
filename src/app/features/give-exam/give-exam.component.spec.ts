import { LoaderComponent } from '../../shared/loader/loader.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveExamComponent } from './give-exam.component';

describe('GiveExamComponent', () => {
  let component: GiveExamComponent;
  let fixture: ComponentFixture<GiveExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveExamComponent, LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GiveExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
