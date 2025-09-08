import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleTicketPage } from './sale-ticket.page';

describe('SaleTicketPage', () => {
  let component: SaleTicketPage;
  let fixture: ComponentFixture<SaleTicketPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
