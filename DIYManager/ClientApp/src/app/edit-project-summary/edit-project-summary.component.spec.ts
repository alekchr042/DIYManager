import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectSummaryComponent } from './edit-project-summary.component';

describe('EditProjectSummaryComponent', () => {
  let component: EditProjectSummaryComponent;
  let fixture: ComponentFixture<EditProjectSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
