import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogModPage } from './log-mod.page';

describe('LogModPage', () => {
  let component: LogModPage;
  let fixture: ComponentFixture<LogModPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogModPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogModPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
