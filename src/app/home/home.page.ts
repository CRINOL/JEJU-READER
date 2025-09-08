import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
import { Args } from '../services/args';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  tickets_total: number = 10000;
  processed_total: number = 1000;
  failed_total: number = 0;
  conn_stat = "Disconnected"
  device = { vrf: "N/A", id: "000"}
  constructor(private args: Args,private router: Router) {}

  openScannerVrf(){
    this.args.setScannerArgs("verify")
    this.router.navigate(["/scanner"])
  }
}
