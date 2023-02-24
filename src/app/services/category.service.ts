import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
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

  create(data:any):Observable<any>{
      return this.http.post(API_GET_CATEGORIES, data, {responseType:'text' as 'json'})
    }

  delete(id: number): Observable<string> {
      return this.http.delete<string>(`${API_GET_CATEGORIES}/${id}`, 
      {responseType: 'text' as 'json'});
      }
      

  getById(id:number):Observable<any>{
      return this.http.get(`${API_GET_CATEGORIES}/${id}`);
    }

  update(id: number, data: any): Observable<string> {
      return this.http.put<string>(`${API_GET_CATEGORIES}/${id}`, data,{responseType: 'text' as 'json'});
    }
}
