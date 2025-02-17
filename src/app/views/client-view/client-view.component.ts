import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { MealPeriodService, MealPeriod } from '../../services/meal-period.service';
import { OrderItem, Order, ITEM_TYPES } from '../../models/order.model';

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-view.component.html',
  styleUrl: './client-view.component.scss'
})
export class ClientViewComponent implements OnInit {
[x: string]: any;
  newItem: OrderItem = {
    name: '',
    quantity: 1,
    notes: '',
    type: 0,
  };

  orderItems: OrderItem[] = [];
  orders: Order[] = [];
  itemTypes:any;
  listProduct: any;
  currentPeriod: MealPeriod = 'closed';
  productTypesList: any;
  hourKitchen: any;
  idCliente: number = 1;
  listClient: any;

  constructor(
    private orderService: OrderService,
    private mealPeriodService: MealPeriodService
  ) {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnInit() {
    this.updateCurrentPeriod();
    this.getProductType();
    this.getOrders();
    // this.getHours();
    setInterval(() => this.updateCurrentPeriod(), 60000);

  }

  getHours() {
    
    const now = new Date();
  
   
    const isoString = now.toISOString().split('.')[0] + "Z";
  
    this.orderService.getHourKitchen(isoString).subscribe(
      c => {
        this.hourKitchen = c;
      },
      error => {
        console.error('Erro ao obter horário da cozinha:', error);
      }
    );
  }

  updateCurrentPeriod() {
    this.currentPeriod = this.mealPeriodService.getCurrentPeriod();
  }

  getOrders() {
    this.orderService.getOrder().subscribe(orders => {
      this.listClient = orders;
    }, error => {
      console.error('Erro ao obter pedidos:', error);
    });
  }

  getProductType(){
    this.orderService.getProductTypes().subscribe(vs => { 
      this.itemTypes = vs
    })
  }



  getProdutosbytipo(idTipoItem: number){
    this.orderService.getProductsbytipo(idTipoItem).subscribe(x => { 
      this.listProduct = x
    })
  }

  

  getCurrentTime() {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getPeriodLabel() {
    return this.mealPeriodService.getPeriodLabel(this.currentPeriod);
  }

  addItem() {
    if (this.newItem.name && this.newItem.quantity > 0 && this.newItem.type) { 
      this.orderItems.push({ ...this.newItem });
       this.newItem = { name: '', quantity: 1, notes: '', type: 0 };
    }
  }

submitOrder() {
  if (this.orderItems.length > 0) {   
    const pedido = {
      IdCliente: 1, // id mocado do cliente
      IdStatus: 1, // será o id do "preparando"
      DtRegister: new Date().toISOString(),
      Itens: this.orderItems.map(item => ({
        IdProduto: item.type, 
        Qtd: item.quantity,
        Notas: item.notes
      }))
    };

    // Chama o serviço para adicionar o pedido
    this.orderService.addOrder(pedido).subscribe({
      next: (response) => {
        this.getOrders();
        console.log('Pedido adicionado com sucesso:', response);
        this.orderItems = []; 
      },
      error: (err) => {
        console.error('Erro ao adicionar pedido:', err);
      }
    });
  } else {
    console.warn('Nenhum item no pedido para enviar.');
  }
}
}