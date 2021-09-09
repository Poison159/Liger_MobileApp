import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationFormModalPage } from './reservation-form-modal.page';

describe('ReservationFormModalPage', () => {
  let component: ReservationFormModalPage;
  let fixture: ComponentFixture<ReservationFormModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationFormModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationFormModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
