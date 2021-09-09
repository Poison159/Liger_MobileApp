import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NearMePage } from './near-me.page';

describe('NearMePage', () => {
  let component: NearMePage;
  let fixture: ComponentFixture<NearMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearMePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NearMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
