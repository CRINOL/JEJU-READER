import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol,
     ZXingScannerModule, MatProgressBarModule, MatCardModule, IonButtons, IonButton, IonIcon]
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
  selectedDevice: MediaDeviceInfo | undefined

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor() { }

  ngOnInit() {
    this.scanResult = "Initializing..."
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    if (devices && devices.length > 0) {
      this.scanResult = "Using back camera"
      this.selectedDevice = devices[1]; // Select the first camera by default
    }
  }

  onScanSuccess(result: string): void {
    this.scanResult = result;
    console.log('Scan successful:', result);
  }

  onScanError(error: Error): void {
    this.scanResult = "Error during scan: " + error
    console.error('Scan error:', error);
  }
}
