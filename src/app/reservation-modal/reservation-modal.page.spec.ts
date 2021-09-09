import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationModalPage } from './reservation-modal.page';

describe('ReservationModalPage', () => {
  let component: ReservationModalPage;
  let fixture: ComponentFixture<ReservationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
