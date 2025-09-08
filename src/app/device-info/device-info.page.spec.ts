import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceInfoPage } from './device-info.page';

describe('DeviceInfoPage', () => {
  let component: DeviceInfoPage;
  let fixture: ComponentFixture<DeviceInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
