import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongForm } from './login-form';

describe('LongForm', () => {
  let component: LongForm;
  let fixture: ComponentFixture<LongForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
