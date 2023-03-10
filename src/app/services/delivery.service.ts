import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_GET_DELIVERIES = 'http://localhost:8082/api/delivery/deliveries';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }
  getDeliveries():Observable<any> {
    return this.http.get(API_GET_DELIVERIES);
    }
    
  createDelivery(delivery: any): Observable<Object> {
      return this.http.post(API_GET_DELIVERIES, delivery);
      }
    
}
