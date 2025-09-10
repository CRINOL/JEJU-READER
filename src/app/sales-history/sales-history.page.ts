import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.page.html',
  styleUrls: ['./sales-history.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class SalesHistoryPage implements OnInit {

  recent_sales:any = []
  active_pk = ""
  active_ticket:any = {}
  constructor() { }

  ngOnInit() {

  }

  getRecentSales(wc:number){
    
  }

  selectTicket(pk:string){
    this.active_pk = pk
  }

}
