import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesButtonComponent } from './roles-button.component';

describe('RolesButtonComponent', () => {
  let component: RolesButtonComponent;
  let fixture: ComponentFixture<RolesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
