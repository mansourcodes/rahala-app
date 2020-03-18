import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuicksearchsPage } from './quicksearchs.page';

describe('QuicksearchsPage', () => {
  let component: QuicksearchsPage;
  let fixture: ComponentFixture<QuicksearchsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicksearchsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuicksearchsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
