import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, ZXingScannerModule]
})
export class ScannerPage implements OnInit {

  title = "Event X"
  tickets_total: number = 0
  processed_total: number = 0;
  failed_total: number = 0;
  conn_stat = "Disconnected"
  dev_vrf = "N/A"
  
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];

  constructor() { }

  ngOnInit() {
  }

}
