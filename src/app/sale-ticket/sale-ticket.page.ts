import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sale-ticket',
  templateUrl: './sale-ticket.page.html',
  styleUrls: ['./sale-ticket.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SaleTicketPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
