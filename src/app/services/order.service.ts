import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Order, ProductType } from '../models/order.model';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = new BehaviorSubject<Order[]>([]);
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getOrders() {
    return this.orders.asObservable();
  }

  getOrder() { debugger
    return this.http.get<ProductType[]>(`${this.apiUrl}/PedidoModels`).pipe(
      catchError(this.handleError))
  }

  getProductTypes(){ 
    return this.http.get<ProductType[]>(`${this.apiUrl}/TiposProdutoModels`).pipe(
      catchError(this.handleError))
  }
  getHourKitchen(hour: string){  debugger
    return this.http.get<ProductType[]>(`${this.apiUrl}/HorarioFuncionamentoModels/Hourkitchen/${hour}`).pipe(
      catchError(this.handleError))
  }

  getProductsbytipo(idTipoProduto: number){ 
    return this.http.get<ProductType[]>(`${this.apiUrl}/ProdutosModels/GetProdutosPorTipo/${idTipoProduto}`).pipe(
      catchError(this.handleError))
  }

  addOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/PedidoModels/`, order).pipe(
      catchError(this.handleError)
    );
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    const updatedOrders = this.orders.value.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    this.orders.next(updatedOrders);
  }

  deleteOrder(orderId: string) {
    const updatedOrders = this.orders.value.filter(order => order.id !== orderId);
    this.orders.next(updatedOrders);
  }

  private handleError(error: HttpErrorResponse) {  debugger
    console.error('Ocorreu um erro:', error);
    return throwError(() => error);
  }
}