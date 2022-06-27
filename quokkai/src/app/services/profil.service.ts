import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) {}

  inscription(data:any): Observable<any> {
    return this.http.post(`http://localhost:8080/inscription`,data);
  }
  article(){
    return this.http.get('http://localhost:8080/article').subscribe((response) => {
      console.log(response);
    });
  }
}
