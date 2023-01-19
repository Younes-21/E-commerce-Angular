import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
const API_GET_ORDERS = 'http://localhost:8082/api/order/orders';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient: any;
  constructor(private http: HttpClient) { }
  getAllOrders(): Observable<any> {
    return this.http.get(API_GET_ORDERS);
    }
    /*createOrder(data: any): Observable<any> {
      return this.http.post(API_GET_ORDERS, data,{responseType:
      'text' as 'json'});
      }*/
      createOrder(order: Order): Observable<Object> {
        return this.http.post(API_GET_ORDERS, order);
        }
      
}
