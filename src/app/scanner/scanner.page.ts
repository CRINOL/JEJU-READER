import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, ZXingScannerModule, MatProgressBarModule, MatCardModule

  ]
})
export class ScannerPage implements OnInit {

  title = "Event X"
  tickets_total: number = 10000;
  processed_total: number = 1000;
  failed_total: number = 0;
  conn_stat = "Disconnected"
  dev_vrf = "N/A"
  scanResult: string | null = null;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | null = null;

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor() { }

  ngOnInit() {
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    if (devices && devices.length > 0) {
      this.selectedDevice = devices[0]; // Select the first camera by default
    }
  }

  onScanSuccess(result: string): void {
    this.scanResult = result;
    console.log('Scan successful:', result);
  }

  onScanError(error: Error): void {
    console.error('Scan error:', error);
  }
}
