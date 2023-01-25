import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_GET_CATEGORIES = 'http://localhost:8082/api/category/categories';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(API_GET_CATEGORIES);
    }
}
