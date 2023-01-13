import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_GET_BASKETS = 'http://localhost:8082/api/basket/baskets';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http: HttpClient) { }
  getAllBaskets(): Observable<any> {
    return this.http.get(API_GET_BASKETS);
    }
    
}
