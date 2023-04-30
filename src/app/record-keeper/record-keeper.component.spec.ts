import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordKeeperComponent } from './record-keeper.component';

describe('RecordKeeperComponent', () => {
  let component: RecordKeeperComponent;
  let fixture: ComponentFixture<RecordKeeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordKeeperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
