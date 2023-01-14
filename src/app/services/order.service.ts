import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_GET_ORDERS = 'http://localhost:8082/api/order/orders';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  getAllOrders(): Observable<any> {
    return this.http.get(API_GET_ORDERS);
    }
}
