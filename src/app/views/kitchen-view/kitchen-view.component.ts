import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order, ITEM_TYPES } from '../../models/order.model';

@Component({
  selector: 'app-kitchen-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitchen-view.component.html',
  styleUrl: './kitchen-view.component.scss'
})
export class KitchenViewComponent {
  orders: Order[] = [];
  listClient: any;

  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
  ngOnInit() {
    this.getOrders();
  }

  getTypeLabel(type: string) {
    return ITEM_TYPES.find(t => t.value === type)?.label || type;
  }
  getOrders() {
    this.orderService.getOrder().subscribe(orders => { debugger
      this.listClient = orders;
    }, error => {
      console.error('Erro ao obter pedidos:', error);
    });
  }
  updateStatus(orderId: string, status: Order['status']) {
    this.orderService.updateOrderStatus(orderId, status);
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId);
  }
}