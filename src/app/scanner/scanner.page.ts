import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { Args } from '../services/args';

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
  scn_state = "Default"
  scn_op = 0;
  scanResult: string | null = null;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor(private args: Args) { }

  ngOnInit() {
    this.scanResult = "Initializing..."
    switch (this.args.getScannerArgs()) {
      case "verify": this.scn_state = "Verify Ticket"
        this.scn_op = 1;
        break;
      default:
    }
  }

  verifyTicket(pk: string) {
    //connect to db to check with pk exists and is unsold
  }

  saleTicket(pk: string) {
    //connect to db to check if pk exists, is unsold and then mark it as sold together with any extra info like phone number and name(useful in verification in the case of a lost ticket)... update it's logging chain and update sales-history for the device
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
