import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../model/bill';
const API_GET_BILLS = 'http://localhost:8082/api/bill/bills';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
getAll(): Observable<any>{
  return this.http.get(API_GET_BILLS);
}
createBill(data: any): Observable<Object> {
  return this.http.post(API_GET_BILLS, data);
  }
}
