import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MauComponent } from './mau.component';

describe('MauComponent', () => {
  let component: MauComponent;
  let fixture: ComponentFixture<MauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
