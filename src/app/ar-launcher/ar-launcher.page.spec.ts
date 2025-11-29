import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ARLauncherPage } from './ar-launcher.page';

describe('ARLauncherPage', () => {
  let component: ARLauncherPage;
  let fixture: ComponentFixture<ARLauncherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ARLauncherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
