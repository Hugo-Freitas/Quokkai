import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  constructor(private http: HttpClient) {}

  inscription(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/inscription`, data);
  }
  connexion(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/connexion`, data);
  }
  mdpOublie(data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/mdpOublie`, data);
  }
  articles(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/articles', data)
  }
}
