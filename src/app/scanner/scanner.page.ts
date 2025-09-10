import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { Args } from '../services/args';
import { Database, ref, set, onValue, push, query } from '@angular/fire/database';

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
  ev_data: any = {}
  scanResult: string | null = null;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined
  buyer_info: any = {}

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  constructor(private args: Args, private db: Database) { }

  ngOnInit() {
    this.scanResult = "Initializing..."
    this.ev_data = this.args.getEventData()
    switch (this.args.getScannerArgs()) {
      case "verify": this.scn_state = "Verify Ticket"
        this.scn_op = 1;
        break;
      case "sale": this.scn_state = "Sell Ticket"
        this.scn_op = 2;
        break;
      default:
    }
  }

  ongoing_op = ""
  op_exp = ""
  next_op = ""
  active_pk = ""
  active_ticket: any = {}
  verifyTicket(pk: string) {
    //connect to db to check with pk exists and is unsold
    this.active_pk = pk
    this.ongoing_op = "Verifying Ticket..."
    let tk_ref = ref(this.db, '/tickets/' + this.ev_data.id + '/' + pk)
    onValue(tk_ref, (snapshot: any) => {
      let dat = snapshot.val()
      if (dat.state == "locked") {
        this.active_ticket = dat
        this.ongoing_op = "Ticket Verified!"
        this.op_exp = "Ticket exists in the system with and is verified. It is currently locked. You can unlock for sale if you wish."
        this.next_op = "UNLOCK NOW"
      } else {
        this.ongoing_op = "Ticket Verified!"
        this.op_exp = "Ticket exists in the system with and is verified."
        this.next_op = "OK"
      }
    })
  }

  unlockNow() {
    let tk_ref = ref(this.db, '/tickets/' + this.ev_data.id + '/' + this.active_pk)
    this.active_ticket.state = "unlocked"
    let date = new Date().toLocaleDateString()
    this.active_ticket.log = { unlock: date }
    set(tk_ref, this.active_ticket).then(() => {
      this.ongoing_op = "Ticket Unlocked!"
      this.op_exp = "Ticket has been unlocked and is ready for sale."
      this.next_op = "OK"
    })

  }

  saleTicket(pk: string) {
    //connect to db to check if pk exists, is unsold and then mark it as sold together with any extra info like phone number and name(useful in verification in the case of a lost ticket)... update it's logging chain and update sales-history for the device
    this.scanResult = "Selling Ticket..."
    this.active_pk = pk
    let tk_ref = ref(this.db, '/tickets/' + this.ev_data.id + '/' + pk)
    onValue(tk_ref, (snapshot: any) => {
      let dat = snapshot.val()
      if (dat.state == "unlocked") {
        this.ongoing_op = "Ticket Available for Sale!"
        this.op_exp = "Would you like to sale this ticket, ID: " + pk + ". Unlock: " + dat.log.unlock + "?"
        this.next_op = "CONFIRM SALE"
        this.active_ticket = dat;
      }
    })
  }

  sellNow() {
    let tk_ref = ref(this.db, '/tickets/' + this.ev_data.id + '/' + this.active_pk)
    this.active_ticket.state = "sold"
    this.active_ticket.log["sold"] = new Date().toLocaleDateString()
    this.active_ticket.log["holder"] = this.buyer_info
    set(tk_ref, this.active_ticket).then(() => {
      tk_ref = ref(this.db, '/sales/' + this.ev_data.id + '/')
      let obj = { prn: this.active_ticket, when: this.active_ticket.log.sold }
      set(tk_ref, obj).then(() => {
        this.ongoing_op = "Ticket Sold!"
        this.op_exp = "Ticket has been sold to " + this.buyer_info.name + " @ " + this.buyer_info.address + "."
        this.next_op = "OK"
      })
    })
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    if (devices && devices.length > 0) {
      this.scanResult = "Using back camera"
      this.selectedDevice = devices[1]; // Select the first camera by default
    }
  }

  verifyScan(pk: string) {
    if (pk.length == 16) {
      return /[^a-zA-Z0-9]/.test(pk)
    } else {
      return -1
    }
  }

  onScanSuccess(result: string): void {
    this.scanResult = result;
    if (this.verifyScan(result)) {
      if (this.scn_op == 1) {
        this.verifyTicket(result)
      } else if (this.scn_op == 2) {
        this.saleTicket(result)
      }
    }
    this.scanResult = "Ticket Unknown!"
    console.log('Scan successful:', result);
  }

  onScanError(error: Error): void {
    this.scanResult = "Error during scan: " + error
    console.error('Scan error:', error);
  }
}
